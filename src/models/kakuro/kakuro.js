
import KakuroSum from './kakuroSum.js';

class Kakuro {
    /**
     * @param {Array<Array<Number>>} data
     */
    constructor(data) {
        this._data = data;
        this._init();
    }

    _init() {
        this.cells = [];
        this.downSums = [];
        this.rightSums = [];

        for (const [y, row] of this._data.entries()) {
            const rowData = [];
            row.forEach((cell, x) => {
                if (Array.isArray(cell)) {
                    const { downSum, rightSum } = this.parseFilledCellData(cell);
                    if (downSum > 0) {
                        this.downSums.push({ x, y, sum: downSum });
                    }
                    if (rightSum > 0) {
                        this.rightSums.push({ x, y, sum: rightSum });
                    }
                }
                rowData.push(cell);
            });
            this.cells.push(rowData);
        }
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
    parseFilledCellData(data = []) {
        return {
            downSum: Number.parseInt(data[0]) || 0,
            rightSum: Number.parseInt(data[1]) || 0,
        };
    }

    /**
     * @description Check that all sums in the grid are valid
     */
    validateSolution() {
        const invalidDownSums = [], invalidRightSums = [];
        for (const { x, y } of this.downSums) {
            const { sum, digits } = this.retrieveColumnSumData(x, y);
            const kakuroSum = new KakuroSum(sum, digits);
            const statusCode = kakuroSum.validate();
            if (statusCode !== KakuroSum.StatusCodes.VALID) {
                invalidDownSums.push({ x, y, statusCode });
            }
        }
        for (const { x, y } of this.rightSums) {
            const { sum, digits } = this.retrieveRowSumData(x, y);
            const kakuroSum = new KakuroSum(sum, digits);
            const statusCode = kakuroSum.validate();
            if (statusCode !== KakuroSum.StatusCodes.VALID) {
                invalidRightSums.push({ x, y, statusCode });
            }
        }
        return { invalidDownSums, invalidRightSums };
    }

    /**
     * @description Given a cell, look for the expected sum & digits
     *              the sum can be the current cell, or a cell above it
     *              the digits may end with the current cell, or continue beneath it
     * @param {Number} x
     * @param {Number} y
     */
    retrieveColumnSumData(x, y) {
        const { cells } = this;
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
        const { cells } = this;
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
}

export default Kakuro;
