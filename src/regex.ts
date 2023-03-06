/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */

export function Escape(str: string = "") {
    if (typeof str !== "string") {
        throw new TypeError("Expected a string");
    }
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

//
export function STRRegExp(str: string = "") {
    return new RegExp(Escape(str));
}
