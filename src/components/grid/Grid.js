import './Grid.css';

import React from 'react';

import BlankCell from './BlankCell.js';
import FilledCell from './FilledCell.js';
import Grid from '../../models/grids/grid.js';

class GridComponent extends React.Component {
    /**
     * @description Display 2-D map of the Kakuro puzzle
     * @param {Array<Array>} cells
     * @param {Function} setFocusCell
     * @param {Function} updateCellValue
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid">
                {
                    this.props.cells.map((row, y) => (
                        <div className="gridRow">
                            {
                                row.map((cell, x) => {
                                    if (Grid.isFilledCell(cell)) {
                                        return <FilledCell downSum={cell[0]} rightSum={cell[1]} x={x} y={y} />
                                    }
                                    return <BlankCell
                                        x={x}
                                        y={y}
                                        setFocusCell={this.props.setFocusCell}
                                        updateCellValue={this.props.updateCellValue}
                                    />
                                })
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default GridComponent;
