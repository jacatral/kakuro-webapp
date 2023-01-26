import React from 'react';

import Grid from './Grid.js';

import { BLANK_CELL } from '../common/constants.js';

function generateBlankCell() {
    return new Array(2);
}

class Kakuro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: this.parseGridData(props.gridData)
        };
    }

    /**
     * @method parseGridData
     * @description convert grid-data string representation to a 2-D array (y, x dimensions)
     * @param {String} gridData
     * -,-,-,-,-
     * -,4/7,,,
     * -,,-,-,-
     * -,,-,-,-
     * -,,-,-,-
     * @returns {Array<Array>}
     * [
     *  [[,], [,], [,], [,], [,]],
     *  [[,], [4,7], '', '', ''],
     *  [[,], '', [,], [,], [,]],
     *  [[,], '', [,], [,], [,]],
     *  [[,], '', [,], [,], [,]]
     * ]
     */
    parseGridData(gridData = '') {
        const rows = gridData.split('\n');
        const y = rows.length;
        const x = rows.reduce((maxLength, rowData) => {
            const columns = rowData.split(',');
            return Math.max(maxLength, columns.length);
        }, 1);

        const grid = [];
        for (const rowData of rows) {
            const row = rowData
                .split(',')
                .map((str) => {
                    const components = str.split('/');
                    if (components.length > 1) {
                        return components;
                    }
                    if (str === BLANK_CELL) {
                        return generateBlankCell();
                    }
                    return str;
                });
            while (row.length < x) {
                row.push(generateBlankCell());
            }
            grid.push(row);
        }
        return grid;
    }

    render() {
        return (
            <div>
                <Grid cells={this.state.cells} />
            </div>
        );
    }
}

export default Kakuro;
