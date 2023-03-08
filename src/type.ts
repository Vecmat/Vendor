/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */

export interface IObjExt extends Object {}

export interface IObject {
    [key: string]: IObject | string | number | undefined | null | void;
}