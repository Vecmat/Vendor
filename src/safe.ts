/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */


// 安全相关工具类

// 单个字符的比较是很快的，攻击者可以细化测量时间精度到微秒，
// 通过响应时间的差异推算出是从哪一个字符开始错误，快速破解

import { createHash } from "crypto";
// 安全比对密码
// https://www.npmjs.com/package/secure-compare
export const verifyPass = (pass: string, salt: string, check: string): boolean => {
    check = createHash("md5").update(`${salt}${check}${salt}`).digest("hex");
    console.log(check);
    if (typeof pass !== "string" || typeof check !== "string") {
        return false;
    }
    let mismatch = pass.length === check.length ? 0 : 1;
    for (let i = 0, il = pass.length; i < il; ++i) {
        // 不等可能会为-1或正整数
        mismatch |= pass.charCodeAt(i) ^ check.charCodeAt(i);
    }
    return mismatch === 0;
};
