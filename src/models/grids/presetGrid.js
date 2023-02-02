
import Grid from './grid.js';
import { BLANK_CELL } from '../../common/constants.js';

class PresetGrid extends Grid {
    /**
     * @param {String} fileName
     */
    constructor(fileName) {
        super();
        this._name = fileName;
    }

    /**
     * @description Read data-file, then parse into 2-D array
     * @returns {Array<Array>}
     */
    getCells() {
        const gridData = this.readFile();
        return this.parseGridData(gridData);
    }

    /**
     * @description Parse data-file
     * @returns {String}
     */
    readFile() {
        return require(`../../data/${this._name}.js`).default;
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
                    columnData = super.generateBlankCell();
                }
                gridData.push(columnData);
            });
            while (gridData.length < maxX) {
                gridData.push(super.generateBlankCell());
            }
            cells.push(gridData);
        }
        return cells;
    }
}

export default PresetGrid;
