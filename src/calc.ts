/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import * as mathjs from "mathjs";

/**
 * Check whether the number is out of range, and give a prompt if it is out of range
 * @param {*number} num
 */
export function checkBoundary(num: number) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER)
        throw new Error(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
}

/**
 * Exact multiplication
 *
 * @param {number} x
 * @param {number} y
 * @returns {*}  {number}
 */
export function multi(x: number, y: number): number {
    return mathjs.multiply(x, y);
}

/**
 * Exact addition
 *
 * @param {number} x
 * @param {number} y
 * @returns {*}
 */
export function plus(x: number, y: number) {
    return mathjs.add(x, y);
}

/**
 * Exact subtraction
 *
 * @param {number} x
 * @param {number} y
 * @returns {*}
 */
export function minus(x: number, y: number) {
    return mathjs.subtract(x, y);
}

/**
 * Exact division
 *
 * @param {number} num1
 * @param {number} num2
 * @returns {*}  {number}
 */
export function divide(x: number, y: number): number {
    return mathjs.divide(x, y);
}

/**
 * rounding
 *
 * @param {number} num
 * @param {number} ratio
 * @returns {*}
 */
export function round(num: number, ratio: number) {
    const base = Math.pow(10, ratio);
    return divide(Math.round(multi(num, base)), base);
}
