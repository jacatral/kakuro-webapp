
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
    isFilledCell(cell) {
        return Array.isArray(cell);
    }

    /**
     * @description Generate grid for kakuro
     * @returns {Array<Array>}
     */
    getCells() {
        throw new Error('Base-class implementation; requires child class override');
    }
}

export default Grid;
