/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */

import lodash from "lodash";
import { AnyObject } from "./base";

/**
 * Checks if fn is a Class
 *
 * @param {AnyObject} obj
 * @returns {boolean}
 */
export function isClass(func: AnyObject): boolean {
    return typeof func === "function" && /^class\s/.test(Function.prototype.toString.call(func));
}

/**
 * Checks if value is a string that contains only numbers
 *
 * @param {string} str
 * @returns {*}  {boolean}
 */
export function isNumberString(str: string): boolean {
    const numberReg = /^((-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;
    return lodash.isString(str) && !isEmpty(str) && numberReg.test(str);
}

/**
 * Checks if value is a standard JSON object,
 * must be a plain object or array
 *
 * @param {AnyObject} value
 * @returns {*}  {boolean}
 */
export function isJSONObj(value: AnyObject): boolean {
    return lodash.isPlainObject(value) || lodash.isArray(value);
}

/**
 * Checks if value is a standard JSON string,
 * must be a string, and can be deserialized as an plain object or array
 *
 * @param {string} value
 * @returns {*}  {boolean}
 */
export function isJSONStr(value: string): boolean {
    if (!lodash.isString(value)) return false;
    try {
        return isJSONObj(JSON.parse(value));
    } catch (e) {
        return false;
    }
}

/**
 * Checks value is empty,
 * undefined, null, '', NaN, [], {} and any empty string(including spaces, tabs, formfeeds, etc.), returns true
 *
 * @param {*} value
 * @returns {*}  {boolean}
 */
export function isEmpty(value: any): boolean {
    if (value === undefined || value === null || value === "") {
        return true;
    } else if (lodash.isString(value)) {
        // \s 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
        return value.replace(/(^\s*)|(\s*$)/g, "").length === 0;
    } else if (lodash.isNumber(value)) {
        return isNaN(value);
    } else if (lodash.isArray(value)) {
        return value.length === 0;
    } else if (lodash.isPlainObject(value)) {
        return Object.keys(value).length === 0;
    }
    return false;
}

/**
 * Checks value is empty,
 * do not consider empty objects, empty arrays, spaces, tabs, form breaks, etc.
 *
 * @param {*} value
 * @returns {*}  {boolean}
 */
export function isTrueEmpty(value: any): boolean {
    if (value === undefined || value === null || value === "") return true;
    if (lodash.isNumber(value)) return isNaN(value);
    return false;
}
