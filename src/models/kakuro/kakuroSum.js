import { NUM_DIGITS } from '../../common/constants.js';

class KakuroSum {
    /**
     * @param {Number} sum
     * @param {Array<Number>} digits
     */
    constructor(sum, digits) {
        this._sum = sum;
        this._digits = digits;
    }

    static get StatusCodes() {
        return {
            VALID: 0,
            COMMON_DIGITS: 1,
            SUM_MISMATCH: 2,
            DIGIT_SUM_ERROR: 3,
        };
    }

    /**
     * @description Add up digits into one value
     * @returns {Number}
     */
    getSum() {
        return this._digits.reduce((ps, num) => ps + num, 0);
    }

    /**
     * @description Check that the index of each digit is unique,
     *              and that each digit is within 1 - 9
     * @returns {Boolean}
     */
    uniquenessCheck() {
        // Determine the index for existing digits
        const indexMap = {};
        for (const [idx, num] of this._digits.entries()) {
            if (num < 1 || num > NUM_DIGITS) {
                console.debug(`Number, ${num}, out of range 1-${NUM_DIGITS}`);
                return false;
            }
            if (Number.isInteger(indexMap[num])) {
                console.debug(`Number, ${num} has a duplicate`);
                return false;
            }
            indexMap[num] = idx;
        }
        return true;
    }

    /**
     * @description Check that the sum of digits add up to the expected sum
     * @returns {Boolean}
     */
    sumCheck() {
        const sum = this.getSum();
        return sum === this._sum;
    }

    /**
     * @description Check the two rules for the Kakuro puzzle:
     *              1. Each digit is unique
     *              2. The sum of the digits match the given sum
     * @returns {Number}
     * 0 = Valid
     * 1 = Common digits
     * 2 = Sum mismatch
     * 3 = Common digits + sum mismatch
     */
    validate() {
        return ((!this.uniquenessCheck() << 0) | (!this.sumCheck() << 1));
    }
}

export default KakuroSum;
