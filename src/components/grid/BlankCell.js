import './Grid.css';

import React from 'react';

class Grid extends React.Component {
    /**
     * @description Display blank cell in the Kakuro grid
     * @param {Number} x
     * @param {Number} y
     * @param {Function} setFocusCell
     * @param {Function} updateCellValue
     */
    constructor(props) {
        super(props);
    }

    render() {
        const { x, y } = this.props;
        return (
            <div className="gridCell">
                <input
                    type="number"
                    step="1"
                    min="1"
                    max="9"
                    onFocus={ () => this.props.setFocusCell(x, y) }
                    onBlur={ e => this.props.updateCellValue(x, y, e.target.value)} />
            </div>
        );
    }
}

export default Grid;
