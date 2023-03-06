/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */

/**
 * 编译模板字符串
 * @param template
 * @param map
 * @param fallback
 * @example Templating('Hi ${person.info.name})', {"person":{"info":{"name":"test"}}}, "--")
 * @returns
 */
export function Templating(template: string, map: object, fallback?: string) {
    return template.replace(/\$\{[^}]+\}/g, match =>
        match
            .slice(2, -1)
            .trim()
            .split(".")
            .reduce((search, key) => search[key] || fallback || match, map)
    );
}

/**
 * Convert the first letter in the value to uppercase
 *
 * @param {string} value
 * @returns {*}  {string}
 */
export function ucFirst(value: string): string {
    if (typeof value !== "string") {
        throw new TypeError("Expected a string");
    }
    return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}




/** @type {*} */
const htmlMaps: any = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quote;",
    "'": "&#39;"
};

/** @type {*} */
const specialMaps: any = {
    "&lt;": "<",
    "&gt;": ">",
    "&quote;": '"',
    "&#39;": "'"
};
/**
 * Convert special characters(> < " ') for entity character
 *
 * @param {string} value
 * @returns {*}  {string}
 */
export function escapeHtml(value: string): string {
    return `${value}`.replace(/[<>'"]/g, a => {
        return htmlMaps[a];
    });
}

/**
 * Convert entity value in value to(> < " ')
 *
 * @param {string} value
 * @returns {*}  {string}
 */
export function escapeSpecial(value: string): string {
    // tslint:disable-next-line: forin
    for (const n in specialMaps) value = value.replace(new RegExp(n, "g"), specialMaps[n]);
    return value;
}


/**
 * convert string to camelCase/pascalCase
 *
 * @param {string} input
 * @param {boolean} [pascalCase=false]
 * @returns {*}
 */
export function camelCase(input: string|string[], pascalCase = false) {
    if (!(typeof input === "string" || Array.isArray(input))) throw new TypeError("Expected the input to be `string | string[]`");

    const postProcess = (x: string) => (pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x);
    if (Array.isArray(input))
        input = input
            .map(x => x.trim())
            .filter(x => x.length)
            .join("-");
    else input = input.trim();

    if (input.length === 0) return "";

    if (input.length === 1) return pascalCase ? input.toUpperCase() : input.toLowerCase();

    const hasUpperCase = input !== input.toLowerCase();
    if (hasUpperCase) input = preserveCamelCase(input);

    input = input
        .replace(/^[_.\- ]+/, "")
        .toLowerCase()
        .replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
        .replace(/\d+(\w|$)/g, m => m.toUpperCase());
    return postProcess(input);
}


/**
 *
 *
 * @param {string} str
 * @returns {*}
 */
function preserveCamelCase(str: string) {
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;

    for (let i = 0; i < str.length; i++) {
        const character = str[i];

        if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
            str = `${str.slice(0, i)}-${str.slice(i)}`;
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
            str = `${str.slice(0, i - 1)}-${str.slice(i - 1)}`;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        } else {
            isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
        }
    }
    return str;
}

