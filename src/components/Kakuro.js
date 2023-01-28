import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Grid from './Grid.js';
import KakuroSum from '../common/kakuroSum.js';

import { BLANK_CELL } from '../common/constants.js';

const defaultPuzzle = 'basic1';
const presetPuzzles = [
    defaultPuzzle,
    'basic2',
];

function generateBlankCell() {
    return new Array(2);
}

class Kakuro extends React.Component {
    /**
     * @description Controller for kakuro game
     * @param {Array<Array>} cells Map of cells for the puzzle
     * @param {Array<Object>} downSums List of column hints to solve
     * @param {Array<Object>} rightSums List of row hints to solve
     */
    constructor(props) {
        super(props);
        this.state = {
            cells: props.cells,
            downSums: props.downSums,
            rightSums: props.rightSums,
        };
    }

    /**
     * @description Assign a value to a blank-cell
     * @param {Number} x
     * @param {Number} y
     * @param {Number} value
     */
    updateCellValue(x, y, value) {
        if (Array.isArray(this.state.cells[y][x])) {
            console.warn(`Cannot modify filled cell at x=${x}, y=${y}`);
            return;
        }
        this.state.cells[y][x] = value;
        this.setState({ cells: this.state.cells });
    }

    /**
     * @description Check that all sums in the grid are valid
     */
    validateSolution() {
        const { downSums, rightSums } = this.state;

        const invalidDownSums = [], invalidRightSums = [];
        for (const { x, y } of downSums) {
            const { sum, digits } = this.retrieveColumnSumData(x, y);
            const kakuroSum = new KakuroSum(sum, digits);
            const statusCode = kakuroSum.validate();
            if (statusCode !== KakuroSum.StatusCodes.VALID) {
                invalidDownSums.push({ x, y, statusCode });
            }
        }
        for (const { x, y } of rightSums) {
            const { sum, digits } = this.retrieveRowSumData(x, y);
            const kakuroSum = new KakuroSum(sum, digits);
            const statusCode = kakuroSum.validate();
            if (statusCode !== KakuroSum.StatusCodes.VALID) {
                invalidRightSums.push({ x, y, statusCode });
            }
        }

        if (invalidDownSums.length === 0 && invalidRightSums.length === 0) {
            alert('The solution is valid');
        } else {
            alert('The solution is invalid');
        }
    }

    /**
     * @description Given a cell, look for the expected sum & digits
     *              the sum can be the current cell, or a cell above it
     *              the digits may end with the current cell, or continue beneath it
     * @param {Number} x
     * @param {Number} y
     */
    retrieveColumnSumData(x, y) {
        const { cells } = this.state;

        let sum, cellValues = [], dy = y;
        // If the current cell is a filled-cell, retrieve the sum
        // When retrieving digits, start on the next row
        if (Array.isArray(cells[y][x])) {
            const cellData = this.parseFilledCellData(cells[y][x]);
            sum = cellData.downSum;
            dy += 1; 
        } else {
            // If the current cell is a blank-cell, retrieve the sum from above digits
            // While navigating up, add other digits to the list
            let cy = y - 1;
            while (cy >= 0 && !sum) {
                if (Array.isArray(cells[cy][x])) {
                    const cellData = this.parseFilledCellData(cells[cy][x]);
                    sum = cellData.downSum;
                } else {
                    cellValues.push(cells[cy][x]);
                }
                cy -= 1;
            }
        }

        // Check for digits in the rows after the input cell
        while (dy < cells.length && !Array.isArray(cells[dy][x])) {
            cellValues.push(cells[dy][x]);
            dy += 1;
        }

        const digits = cellValues.map((str) => {
            return Number.parseInt(str) || 0;
        });
        return { sum, digits };
    }

    /**
     * @description Given a cell, look for the expected sum & digits
     *              the sum can be the current cell, or a cell left of it
     *              the digits may end with the current cell, or continue right
     * @param {Number} x
     * @param {Number} y
     */
    retrieveRowSumData(x, y) {
        const { cells } = this.state;
        const row = cells[y];

        let sum, cellValues = [], dx = x;
        // If the current cell is a filled-cell, retrieve the sum
        // When retrieving digits, start on the next row
        if (Array.isArray(row[x])) {
            const cellData = this.parseFilledCellData(row[x]);
            sum = cellData.rightSum;
            dx += 1;
        } else {
            // If the current cell is a blank-cell, retrieve the sum from left digits
            // While navigating left, add other digits to the list
            let cx = x - 1;
            while (cx >= 0 && !sum) {
                if (Array.isArray(row[cx])) {
                    const cellData = this.parseFilledCellData(row[cx]);
                    sum = cellData.rightSum;
                } else {
                    cellValues.push(row[x]);
                }
                cx -= 1;
            }
        }

        // Check for digits in the columns after the input cell
        while (dx < row.length && !Array.isArray(row[dx])) {
            cellValues.push(row[dx]);
            dx += 1;
        }

        const digits = cellValues.map((str) => {
            return Number.parseInt(str) || 0;
        });
        return { sum, digits };
    }

    render() {
        return (
            <div>
                <Grid cells={this.state.cells} updateCellValue={this.updateCellValue.bind(this)} />
                <input type="button" value="Check Solution" onClick={this.validateSolution.bind(this)}/>
            </div>
        );
    }
}

/**
 * @description Generate grid-data from seed, for keywords it is a file to read
 * @param {String} seed
 * @returns {String}
 */
function fetchGridData(seed = defaultPuzzle) {
    if (presetPuzzles.includes(seed)) {
        return require(`../data/${seed}.js`).default;
    }
    return '';
}

/**
 * @description Retrieve the sum for the column/row of a given cell
 * @param {Array<String>} data
 * @returns {Object}
 * {
 *   downSum: 0,
 *   rightSum: 0
 * }
 */
function parseFilledCellData(data = []) {
    return {
        downSum: Number.parseInt(data[0]) || 0,
        rightSum: Number.parseInt(data[1]) || 0,
    };
}

/**
 * @description Convert grid-data string representation to a 2-D array (y, x dimensions)
 * @param {String} gridData
 * -,-,-,-,-
 * -,5/7,,,
 * -,,-,-,-
 * -,,-,-,-
 * -,,-,-,-
 * @returns {Object}
 * {
 * [
 *   cells: [
 *      [[,], [,], [,], [,], [,]],
 *      [[,], [5,7], '', '', ''],
 *      [[,], '', [,], [,], [,]],
 *      [[,], '', [,], [,], [,]],
 *      [[,], '', [,], [,], [,]]
 *   ],
 *   downSums: [ { x: 1, y: 1, sum: 5 }, ... ],
 *   rightSums: [ { x: 1, y: 1, sum: 7 }, ... ],
 * }
 */
function parseGridData(gridData = '') {
    const rows = gridData.split('\n');
    const maxX = rows.reduce((maxLength, rowData) => {
        const columns = rowData.split(',');
        return Math.max(maxLength, columns.length);
    }, 1);

    const cells = [], downSums = [], rightSums = [];
    console.log();
    for (const [y, rowData] of rows.entries()) {
        const row = rowData
            .split(',');
        const gridData = [];
        row.forEach((str, x) => {
            let columnData = str;
            const components = str.split('/');
            if (components.length > 1) {
                const { downSum, rightSum } = parseFilledCellData(components);
                columnData = components;

                if (downSum > 0) {
                    downSums.push({ x, y, sum: downSum });
                }
                if (rightSum > 0) {
                    rightSums.push({ x, y, sum: rightSum });
                }
            }
            if (str === BLANK_CELL) {
                columnData = generateBlankCell();
            }
            gridData.push(columnData);
        });
        while (gridData.length < maxX) {
            gridData.push(generateBlankCell());
        }
        cells.push(gridData);
    }
    return {
        cells, downSums, rightSums
    }
}

export default (props) => {
    const params = useParams();
    const seed = params && params.puzzleSeed;
    const gridData = fetchGridData(seed);
    const { cells, downSums, rightSums } = parseGridData(gridData);
    return (
        <Kakuro {...props} params={params} key={seed} cells={cells} downSums={downSums} rightSums={rightSums} />
    )
};
