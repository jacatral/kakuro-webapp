import './Grid.css';

import React from 'react';

class Grid extends React.Component {
    /**
     * @description Display blank cell in the Kakuro grid
     * @param {Number} x
     * @param {Number} y
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gridCell">
                <input type="text"/>
            </div>
        );
    }
}

export default Grid;
