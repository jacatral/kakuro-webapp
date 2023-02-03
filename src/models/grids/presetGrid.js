
import Grid from './grid.js';

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
        return super.parseGridData(gridData);
    }

    /**
     * @description Parse data-file
     * @returns {String}
     */
    readFile() {
        return require(`../../data/${this._name}.js`).default;
    }
}

export default PresetGrid;
