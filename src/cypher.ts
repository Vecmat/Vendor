/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import * as crypto from "crypto";


/**
 * Calculate the MD5 hash of value
 *
 * @param {string} value
 * @returns {*}  {string}
 */
export function md5(value: string): string {
    const ins = crypto.createHash("md5");
    ins.update(value);
    return ins.digest("hex");
}

/**
 * Calculate the value of MD5 hash value, including simple salt
 *
 * @param {string} value
 * @param {string} [salt='abcdefghijklmnopqrstuvwxyz1234567890']
 * @returns {*}  {string}
 */
export function md5Salt(value: string, salt = "abcdefghijklmnopqrstuvwxyz1234567890"): string {
    const ins = crypto.createHash("md5");
    value = value + salt.slice(value.length % salt.length, salt.length);
    ins.update(value);
    return ins.digest("hex");
}
