/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
interface DeferObject {
    promise: Promise<any>;
    resolve: (res: any) => any;
    reject: (err: any) => any;
}

/**
 * Get promise deffer object
 *
 * @returns {*}
 */
export function getDefer(): DeferObject {
    const defer: any = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**
 * Checks if fn is a GeneratorFunction
 *
 * @export
 * @param {*} fn
 * @returns {*}  {boolean}
 */
export function isGenerator(fn: any) {
    return !!(fn && typeof fn === "function" && fn.constructor && fn.constructor.name === "GeneratorFunction");
}

/**
 * Checks if value is a Promise object
 *
 * @export
 * @param {*} value
 * @returns {*}  {boolean}
 */
export function isPromise(value: any) {
    return !!(value && value.catch && typeof value.then === "function");
}

/**
 * Checks if value is a Async Function
 *
 * @export
 * @param {*} fn
 * @returns {*}  {boolean}
 */
export function isAsyncFunction(fn: any) {
    return !!(fn && typeof fn === "function" && fn.constructor && fn.constructor.name === "AsyncFunction");
}


/**
 * Convert callback-style functions to Promises
 *
 * @export
 * @param {Function} fn
 * @param {*} [receiver]
 * @returns {*}
 */
export function promisify(fn: Function, receiver?: any) {
    return function (...args: any[]) {
        return new Promise((resolve, reject) => {
            fn.apply(receiver, [
                ...args,
                function (err: Error, res: any) {
                    return err ? reject(err) : resolve(res);
                }
            ]);
        });
    };
}



// 基于反射转义函数

//  Build for Vecmat.
export type Callback<E extends Error, T extends any[]> = (err: E, ...args: T) => void;

// 解析参数
export type PromisifyOne<T extends any[]> = T extends [Callback<Error, infer P>?]
    ? () => Promise<[...P, Error]>
    : T extends [infer T1, Callback<Error, infer P>?]
    ? (arg: T1) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => Promise<[...P, Error]>
    : T extends [infer T1, infer T2, infer T3, infer T4, infer T5, infer T6, infer T7, infer T8, infer T9, Callback<Error, infer P>?]
    ? (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8, arg9: T9) => Promise<[...P, Error]>
    : T;

// 获取重载参数！
export type GetOverloadArgs<T> = T extends { (...o: infer U): void; (...o: infer U2): void; (...o: infer U3): void }
    ? U | U2 | U3
    : T extends { (...o: infer U): void; (...o: infer U2): void }
    ? U | U2
    : T extends { (...o: infer U): void }
    ? U
    : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Promisify<T> = UnionToIntersection<PromisifyOne<GetOverloadArgs<T>>>;

// Error first callback
export function VMAsyncifyWrap<T extends Function>(original: T) {
    if (typeof original !== "function") {
        throw new Error('The "original" argument must be of type Function. Received type undefined');
    }
    // Function
    // AsyncFunction
    // GeneratorFunction
    // let ftype  = original.constructor.name;
    // // 普通函数
    // if(ftype == "Function"){
    //     // 检测最后一个是否是函数
    // }

    // Names to create an object from in case the callback receives multiple
    // arguments, e.g. ['bytesRead', 'buffer'] for fs.read.
    async function asyncfun(...args: any[]) {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                Array.prototype.push(args, (err: Error, ...values: any[]) => {
                    // can return err whith data
                    resolve([err, ...values]);
                });
                Reflect.apply(original, this, args);
            } catch (err) {
                // 不丢给then第二个参数
                throw err;
            }
        });
    }
    let prot = Object.getPrototypeOf(original);
    prot.constructor.name = "AsyncifyFunction";
    console.log(prot);
    delete prot["constructor"];
    // Object.setPrototypeOf(fn, prot);
    Object.defineProperties(asyncfun, Object.getOwnPropertyDescriptors(original));
    // Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

    return asyncfun;
}

// refer

// https://stackoverflow.com/questions/51650979/type-inference-with-overloaded-functions/51654917#51654917
// https://github.com/wechaty/grpc/blob/58fa4006df93a6269194d682b0f988c1f3eb46c0/examples/promisify.ts
// 需要参考 promisify 源码，改写 成VM 模式下的
// https://github.com/nodejs/node/blob/42c0b2ae65e99e4774fe1d8a82a50b09b894adc7/lib/internal/util.js#L375
// 泛型工具参考
// https://github.com/sindresorhus/type-fest/blob/main/source/asyncify.d.ts
// 直接转换 async 参数
// https://github.com/sindresorhus/type-fest/blob/main/source/async-return-type.d.ts

// 基于AST 处理 asyncify
// https://github.com/SpitfireSatya/asyncify
