/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */

import murmurhash from "murmurhash";

/**
 * 随机范围内整数
 * @param {int} min 最小值，默认0
 * @param {int} max 最大值，默认值100
 */
export const INT = (min: number = 0, max: number = 100): number => {
    // 特殊的技巧，|0可以强制转换为整数
    return (Math.random() * (max - min + 1) + min) | 0;
    // return Math.floor(min + Math.random() * (max - min + 1));
};


// 随机字符串

const RandomBase = (len: number, charSet?: string): string => {
    const chars = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomStr = "";
    for (let i = 0; i < len; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomStr;
};

export const String = (len: number): string => {
    return RandomBase(len);
};

/**
 * 生成随机hex字符串（0-9a-f）
 * @param {Number} len  hash length
 * @return {String} hash string
 */
export const Hex = (len: number = 6): string => {
    // return Math.random().toString(35).substr(2, len);
    const hexs = "0123456789ABCDEF";
    return RandomBase(len, hexs);
};

/**
 * 生成随机字符串（0-9a-z）
 *
 * @param {Number} len  uid length
 * @return {String} uid string
 */
export const Hash = (len: number = 6) => {
    // return Math.random().toString(35).substr(2, len);
    const hexs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return RandomBase(len, hexs);
};


/**
 * Murmur hash v2/v3
 *
 * @param {string} value
 * @param {number} [seed=97]
 * @param {number} [ver=2]
 * @returns {*}  {string}
 */
export function murmur(value: string, seed = 66, ver = 2): string {
    if (ver === 3) return `${murmurhash.v3(value, seed)}`;
    else return `${murmurhash.v2(value, seed)}`;
}


// 非标准UUIE格式
import * as AUUID from "uuid";
// http://www.voidcn.com/article/p-rrqbjbcc-bsw.html
// https://segmentfault.com/q/1010000010862121
export const UUID = (version: number, name: string = "", namespace: string = ""): string => {
    let uuidstr = "";
    // 3,5 版本返回值固定
    version = name ? version : 4;
    namespace = namespace || "vecmat";
    switch (version) {
        case 1:
            uuidstr = AUUID.v1();
            break;
        case 3:
            uuidstr = AUUID.v3(name, namespace);
            break;
        case 4:
            uuidstr = AUUID.v4();
            break;
        case 5:
            uuidstr = AUUID.v5(name, namespace);
            break;
        default:
            uuidstr = AUUID.v4();
    }
    return uuidstr;
};
