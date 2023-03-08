/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import lodash from "lodash";
import { IObjExt } from "./type";


/**
 * Determines whether value is an element of array arr,
 * only determine the same value with the element, do not determine the type
 *
 * @param {*} value
 * @param {any[]} arr
 * @returns {*} {boolean}
 */
export function inArray(value: any, arr: any[]): boolean {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        // tslint:disable-next-line: triple-equals
        if (arr[i] == value) return true;
    }
    return false;
}

/**
 * Removes the specified index element from the array
 *
 * @param {any[]} arr
 * @param {number} index
 * @returns {*}  {any[]}
 */
export function arrRemove(arr: any[], index: number): any[] {
    return lodash.remove(arr, (n, i) => {
        return i !== index;
    });
}

/**
 * The object obj prototype instance conversion to organize the data structure stored in the object,
 * access to this object in the v8 engine will be faster
 * @param {IObjExt} obj
 */
export function toFastProperties(obj: IObjExt) {
    // eslint-disable-next-line no-empty-function
    const f: any = function f() {};
    f.prototype = obj;
    // tslint:disable-next-line: no-unused-expression
    new f();
}

/**
 * Copy the source, deep deep to true depth copy
 *
 * @param {IObjExt} source
 * @param {boolean} [deep=false]
 * @returns {*} {IObjExt}
 */
export function clone(source: IObjExt, deep = false): IObjExt {
    if (deep) return lodash.cloneDeep(source);
    else return lodash.clone(source);
}

/**
 * So that the target object inherits the source,
 * deep depth is true depth inheritance
 *
 * @param {IObjExt} source
 * @param {IObjExt} target
 * @param {boolean} [deep=false]
 * @returns {*}  {IObjExt}
 */
export function extendObj(source: IObjExt, target: IObjExt, deep = false): IObjExt {
    if (deep) return lodash.merge(lodash.cloneDeep(source), target);
    else return lodash.assignIn(source, target);
}

/**
 * Short for hasOwnProperty
 *
 * @export
 * @param {IObjExt} obj
 * @param {string} property
 * @returns {*}  {boolean}
 */
export function hasOwn(obj: IObjExt, property: string) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

/**
 * Short for Object.defineProperty,
 * the property is getter when setter is false
 *
 * @param {IObjExt} obj
 * @param {string} property
 * @param {*} value
 * @param {boolean} [setter=false]
 * @returns {*}
 */
export function defineProp(obj: IObjExt, property: string, value: any, setter = false) {
    if (setter) {
        Object.defineProperty(obj, property, {
            value,
            writable: true,
            configurable: false,
            enumerable: true
        });
    } else {
        Object.defineProperty(obj, property, {
            // tslint:disable-next-line-literal-shorthand
            get() {
                return value;
            },
            configurable: false,
            enumerable: true
        });
    }
}
