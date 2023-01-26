import './Grid.css';

import React from 'react';

class Grid extends React.Component {
    /**
     * @description Display filled cell in the Kakuro grid
     * @param {String} downSum
     * @param {String} rightSum
     * @param {Number} x
     * @param {Number} y
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="gridCell filledCell">
                {(this.props.downSum || this.props.rightSum) && <div className="sumDivider" />}
                {(this.props.downSum && !this.props.rightSum) && <div className="rightFill" />}
                {(!this.props.downSum && this.props.rightSum) && <div className="downFill" />}

                {this.props.downSum && <span className="downSum">{this.props.downSum || ''}</span>}
                {this.props.rightSum && <span className="rightSum">{this.props.rightSum || ''}</span>}
            </div>
        );
    }
}

export default Grid;
