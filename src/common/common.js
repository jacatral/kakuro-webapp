const { NUM_DIGITS } = require('./constants.js');

/**
 * @description Create array of digits
 * @returns {Array<Number>}
 */
function generateDigitArray() {
    return Array.from({ length: NUM_DIGITS }, (_, i) => i + 1);
}

/**
 * @description Compute the sum of digits in an array
 * @param {Array<Number>} digits
 * @returns {Number}
 */
function digitSum(digits) {
    return digits.reduce((ps, num) => ps + num, 0);
}

/**
 * @description Convert integer to hex value
 * @param {Number} integer
 * @returns {String}
 */
function toHex(integer) {
    return Number(integer).toString(16);
}

/**
 * @description convert integer red/green/blue values to hex
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @returns {String} #000000
 */
function toRGB(r = 0, g = 0, b = 0) {
    const rh = toHex(r);
    const rHex = rh.length == 1 ? `0${rh}` : rh;

    const gh = toHex(g);
    const gHex = gh.length == 1 ? `0${gh}` : gh;

    const bh = toHex(b);
    const bHex = bh.length == 1 ? `0${bh}` : bh;

    return `#${rHex}${gHex}${bHex}`;
}

export { digitSum, generateDigitArray, toHex, toRGB };
