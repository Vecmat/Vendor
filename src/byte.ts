/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
export const Hexstring2btye = (str: string) => {
    let pos = 0;
    let len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    let hexA = new Array();
    for (let i = 0; i < len; i++) {
        let s = str.substr(pos, 2);
        let v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
};
export const Bytes2HexString = (b: Buffer) => {
    let hexs = "";
    for (let i = 0; i < b.length; i++) {
        let hex = b[i].toString(16);
        if (hex.length === 1) {
            hex = "0" + hex;
        }
        hexs += hex.toUpperCase();
    }
    return hexs;
};
