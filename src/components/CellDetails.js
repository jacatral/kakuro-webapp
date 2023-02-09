import './CellDetails.css';

import React from 'react';

import { NUM_DIGITS } from '../common/constants.js';

class CellDetails extends React.Component {
    /**
     * @description Provide more details supporting a 
     * @param {Number} x
     * @param {Number} y
     * @param {Function} updateCellValue
     */
    constructor(props) {
        super(props);
    }

    init() {
        const { columnData, rowData } = this.props.focusCell;
        const occupiedDigits = [].concat(
            columnData && columnData.digits || [],
            rowData && rowData.digits || [],
        );

        this.options = [];
        for (let i = 1; i <= NUM_DIGITS; i += 1) {
            if (occupiedDigits.includes(i)) {
                console.info(`Digit ${i} is already being used`);
                continue;
            }
            this.options.push(i);
        }
    }

    render() {
        this.init();
        const x = this.props.focusCell && this.props.focusCell.x || 0;
        const y = this.props.focusCell && this.props.focusCell.y || 0;
        const value = this.props.focusCell && this.props.focusCell.value || 0;
        const pool = Array.from({ length: NUM_DIGITS }, (_, i) => i + 1);
        return (
            <div className="cellDetails">
                <span className="title">Cell Details</span>
                <div className="attributes">
                    <span> x = {x}</span>
                    <span> y = {y}</span>
                    <span> Value = {value}</span>
                </div>
                <div className="options">
                    {
                        pool.map((digit) => {
                            return (
                                <div className={!(this.options.includes(digit)) ? "option disabled" : "option"}>
                                    <center>{digit}</center>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CellDetails;
