import { BLANK_CELL } from '../../common/constants.js';

class Grid {
    constructor() {}

    /**
     * @description Provide empty array representation for border cells in grid
     * @returns {Array}
     */
    generateBlankCell() {
        return new Array(2);
    }

    /**
     * @description Check cell value if it is a filled one (i.e. no user input)
     * @param {*} cell
     * @returns {Boolean}
     */
    static isFilledCell(cell) {
        return Array.isArray(cell);
    }

    /**
     * @description Generate grid for kakuro
     * @returns {Array<Array>}
     */
    getCells() {
        throw new Error('Base-class implementation; requires child class override');
    }

    /**
     * @description Convert grid-data string representation to a 2-D array (y, x dimensions)
     * @param {String} gridData
     * -,-,-,-,-
     * -,5/7,,,
     * -,,-,-,-
     * -,,-,-,-
     * -,,-,-,-
     * @returns {Array<Array>}
     * [
     *   [[,], [,], [,], [,], [,]],
     *   [[,], [5,7], '', '', ''],
     *   [[,], '', [,], [,], [,]],
     *   [[,], '', [,], [,], [,]],
     *   [[,], '', [,], [,], [,]]
     * ]
     */
    parseGridData(gridData) {
        const rows = gridData.split('\n');
        const maxX = rows.reduce((maxLength, rowData) => {
            const columns = rowData.split(',');
            return Math.max(maxLength, columns.length);
        }, 1);

        const cells = [];
        for (const rowData of rows) {
            const row = rowData
                .split(',');
            const gridData = [];
            row.forEach((str) => {
                let columnData = str;
                const components = str.split('/');
                if (components.length > 1) {
                    columnData = components;
                }
                if (str === BLANK_CELL) {
                    columnData = this.generateBlankCell();
                }
                gridData.push(columnData);
            });
            while (gridData.length < maxX) {
                gridData.push(this.generateBlankCell());
            }
            cells.push(gridData);
        }
        return cells;
    }
}

export default Grid;
