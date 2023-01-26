import './Grid.css';

import React from 'react';

import BlankCell from './BlankCell.js';
import FilledCell from './FilledCell.js';

class Grid extends React.Component {
    /**
     * @description Display 2-D map of the Kakuro puzzle
     * @param {Array<Array>} cells
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
                                    if (Array.isArray(cell)) {
                                        return <FilledCell downSum={cell[0]} rightSum={cell[1]} x={x} y={y} />
                                    }
                                    return <BlankCell x={x} y={y} />
                                })
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Grid;
