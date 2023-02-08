class GridCache {
    constructor(gridMap) {
        this.gridMap = gridMap;
        this.sizeMap = GridCache.mapGridsBySize(gridMap)
    }

    /**
     * @description Group up grid seeds by size
     * @param {Object<seed, grid>} gridMap
     * {
     *   "69b615a9": "-,-,-,11/,8/\n/18,,,,\n-,7/,13/9,,\n/10,,,-,-\n/13,,,,-"
     * }
     * @returns {Object}
     * {
     *   4: [ "69b615a9" ]
     * }
     */
    static mapGridsBySize(gridMap) {
        return Object.entries(gridMap).reduce((gridMap, [key, gridData]) => {
            const rows = gridData.split('\n');
            const sampleRow = rows[0].split(',');
            const gridSize = sampleRow.length - 1;

            gridMap[gridSize] = gridMap[gridSize] || [];
            gridMap[gridSize].push(key);
            return gridMap;
        }, {});
    }

    /**
     * @decription Retrieve value from the grid-map
     * @param {String} key
     * @returns {*}
     */
    get(key) {
        return this.gridMap[key];
    }

    /**
     * @description Check if a key exists in the cache
     * @param {String} key
     * @returns {Boolean}
     */
    contains(key) {
        return key in this.gridMap;
    }

    /**
     * @decription Reverse mapping of a key given the value
     * @param {String} value
     * @returns {String}
     */
    findKey(value) {
        for (const [key, gridData] of Object.entries(this.gridMap)) {
            if (value === gridData) {
                console.debug('Found grid-data in storage under id:', key);
                return key;
            }
        }
        return null;
    }

    /**
     * @decription Update the internal links given a new seed entry
     * @param {String} key
     * @param {*} value
     * @returns {String}
     */
    set(key, value) {
        const sampleRows = value.split('\n');
        const gridSize = (sampleRows[0].split(',')).length - 1;

        localStorage.setItem(key, value);
        this.gridMap[key] = value;
        this.sizeMap[gridSize] = this.sizeMap[gridSize] || [];
        this.sizeMap[gridSize].push(key);
    }
}

export default GridCache;
