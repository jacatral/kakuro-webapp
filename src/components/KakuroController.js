import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Grid from './grid/Grid.js';
import Kakuro from '../models/kakuro/kakuro.js';
import PresetGrid from '../models/grids/presetGrid.js';

const defaultPuzzle = 'basic1';
const presetPuzzles = [
    defaultPuzzle,
    'basic2',
];


class KakuroController extends React.Component {
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
        const kakuro = new Kakuro(this.state.cells);
        const { invalidDownSums, invalidRightSums } = kakuro.validateSolution();
        if (invalidDownSums.length === 0 && invalidRightSums.length === 0) {
            alert('The solution is valid');
        } else {
            alert('The solution is invalid');
        }
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
        const presetGrid = new PresetGrid(seed);
        return presetGrid.getCells();
    }
    return '';
}

export default (props) => {
    const params = useParams();
    const seed = params && params.puzzleSeed;
    const cells = fetchGridData(seed);
    return (
        <KakuroController {...props} params={params} key={seed} cells={cells} />
    )
};