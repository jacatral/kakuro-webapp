import './CellDetails.css';

import React from 'react';

import { digitSum, generateDigitArray, toRGB } from '../common/common.js';
import { k_combinations } from '../common/combinations.js';
import { NUM_DIGITS } from '../common/constants.js';

const digitCombinations = {};
/**
 * @description Compute all K-Combinations for digits (1-9)
 *              Store the computation locally so that results for one set is computed once
 * @param {Number} k
 * @returns {Array<Array<Number>>}
 */
function getKDigitCombinations(k = 2) {
    // If combination was previously computed, retrieve previous value
    if (digitCombinations[k]) {
        return digitCombinations[k];
    }

    // Otherwise generate all possible k-combinations & then store in memory
    const digits = generateDigitArray();
    const combinations = k_combinations(digits, k);
    digitCombinations[k] = combinations;
    return combinations;
}

class CellDetails extends React.Component {
    /**
     * @description Provide more details regarding a cell the user has focused on
     * @param {Object} focusCell
     * {
     *   "x": 0,
     *   "y": 0,
     *   "value": 0,
     *   "columnData": {
     *     "sum": 0,
     *     "digits": [0],
     *   },
     *   "rowData": {
     *     "sum": 0,
     *     "digits": [0],
     *   }
     * }
     */
    constructor(props) {
        super(props);
    }

    computeSuggestions() {
        const { value } = this.props;
        const { columnData, rowData } = this.props.focusCell;
        const columnDigits = columnData && columnData.digits || [];
        const rowDigits = rowData && rowData.digits || [];
        const occupiedDigits = [].concat(columnDigits, rowDigits);

        // Determine which digits can be filled in the cell
        this.options = [];
        for (let i = 1; i <= NUM_DIGITS; i += 1) {
            if (i !== value && occupiedDigits.includes(i)) {
                console.debug(`Digit ${i} is already being used`);
                continue;
            }
            this.options.push(i);
        }

        // Determine which digits should ideally be used for the column/row
        const columnSum = columnData && columnData.sum || [];
        this.columnSuggestions = getKDigitCombinations(columnDigits.length)
            .filter((c) => digitSum(c) === columnSum);

        const rowSum = rowData && rowData.sum || [];
        this.rowSuggestions = getKDigitCombinations(rowDigits.length)
            .filter((c) => digitSum(c) === rowSum);
    }

    render() {
        this.computeSuggestions();
        const x = this.props.focusCell && this.props.focusCell.x || 0;
        const y = this.props.focusCell && this.props.focusCell.y || 0;
        const value = this.props.focusCell && this.props.focusCell.value || 0;
        const pool = generateDigitArray();

        const suggestions = [].concat(this.columnSuggestions, this.rowSuggestions);
        const scores = pool.map((digit) => suggestions.reduce((ps, comb) => ps + (comb.includes(digit)), 0));

        const max_score = scores.reduce((ms, s) => Math.max(ms, s), 0);
        const normalized_scores = scores.map((s) => s / max_score);
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
                        pool.map((digit, idx) => {
                            const score = normalized_scores[idx];
                            // With normalized scores, have higher scoring digits use a greener hue
                            const r = 218 - Math.floor(score * 155);
                            const g = 221;
                            const b = 152 - Math.floor(score * 152);
                            const styling = {
                                'background-color': toRGB(r, g, b)
                            };
                            return (
                                <div
                                    className={!(this.options.includes(digit)) ? "option disabled" : "option"}
                                    style={this.options.includes(digit) && styling || null}
                                >
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
