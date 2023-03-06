/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import { Templating } from "./str";

/**
 * 错误处理
 * todo:async-hook
 * https://trace.js.org/
 */
Error.stackTraceLimit = 100;
const __stack: any = global.global;
Object.defineProperty(global, "__stack", {
    get: function () {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        const err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        const stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, "__line", {
    get: function () {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, "__function", {
    get: function () {
        return __stack[2].getFunctionName();
    }
});

// 导出结果类型
// async 返回结果
export type TRESULT<T> = [Error | null, T | object | string | null];

export type TRESULTASYNC<T> = Promise<TRESULT<T>>;

export type TAPPRESULT<T extends object> = [Error | null, T | object | null];

export type TAPPRESULTASYNC<T extends object> = Promise<TAPPRESULT<T>>;

// ! 错误基类
// https://github.com/reduardo7/ts-base-error/blob/master/src/index.ts
export class BaseError extends Error {
    constructor(message?: string) {
        const trueProto = new.target.prototype;
        super(message);
        // for ES6
        Object.setPrototypeOf(this, trueProto);
        // for ES5
        // this.__proto__ = trueProto;
    }
}

// 较好的实现错误类
// https://github.com/g2a-com/node-standard-error/blob/master/src/index.ts
export class Exception extends BaseError {
    // 基本信息
    public sign: string;
    public temp: string;
    public name: string;
    public message: string;
    // 扩展
    public info: object;
    public secret: object;

    // 扩展参数
    public func: string;
    public line: string;
    // 内部方法
    public isException = true;
    // 扩展Error ，info 将会返回到客户端
    // 用sign标识错误，管理数据库，sign唯一
    // sign数据库存储,temp存数据库或者采用，然后处理多语言
    // handle内部可以针对temp处理
    constructor(sign: string, temp = "", info = {}, secret = {}) {
        super(sign);
        this.sign = sign;
        this.temp = temp || "";
        this.info = info;
        this.secret = secret;
        this.name = this.constructor.name;
        // 待考虑是否使用
        // this.line = __stack[1].getLineNumber();
        // this.func = __stack[1].getFunctionName();
    }

    public toText() {
        return Templating(this.temp, this.info);
    }
    // public toXML(){
    //     // return json2xml(this.toJson());
    // }
    public toJson() {
        return {
            name: this.name,
            sign: this.sign,
            info: this.info,
            message: Templating(this.temp, this.info)
        };
    }
}
