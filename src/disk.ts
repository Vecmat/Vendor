/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import * as fs from "fs";

import * as path from "path";

/**
 * The platform-specific file separator. '\' or '/'.
 */
export const sep = path.sep;

/**
 * Checks if path is a file
 * Synchronous mode
 *
 * @param {string} p
 * @returns {*}  {boolean}
 */
export function isFile(p: string): boolean {
    try {
        const stats = fs.statSync(p);
        return stats.isFile();
    } catch (e) {
        return false;
    }
}

/**
 * Checks if path is a dir
 * Synchronous mode
 *
 * @param {string} p
 * @returns {*}  {boolean}
 */
export function isDir(p: string): boolean {
    try {
        const stats = fs.statSync(p);
        return stats.isDirectory();
    } catch (e) {
        return false;
    }
}

/**
 * Read the contents of the file filename.
 * Asynchronous mode
 *
 * @param {string} filename
 * @param {string} [enc='utf8']
 * @returns {*}  {Promise<any>}
 */
export function readFile(filename: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.readFile(filename, (err, res) => {
            return err ? reject(err) : fulfill(res);
        });
    });
}

/**
 * Checks if the file or folder p is writable
 * Synchronous mode
 *
 * @param {string} p
 * @returns {*}  {boolean}
 */
export function isWritable(p: string): boolean {
    try {
        const stats = fs.statSync(p);
        const mode = stats.mode;
        const uid = process.getuid ? process.getuid() : 0;
        const gid = process.getgid ? process.getgid() : 0;
        const owner = uid === stats.uid;
        const group = gid === stats.gid;
        return !!((owner && mode & parseInt("00200", 8)) || (group && mode & parseInt("00020", 8)) || mode & parseInt("00002", 8));
    } catch (e) {
        return false;
    }
}

/**
 * Write the string data to file.
 * Asynchronous mode
 *
 * @param {string} filename
 * @param {(string | Buffer)} data
 * @returns {*}  {Promise<any>}
 */
export function writeFile(filename: string, data: string | Buffer): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.writeFile(filename, data, err => {
            return err ? reject(err) : fulfill(null);
        });
    });
}

/**
 * Rename the file. If newFileName and fileName be not in the same physical path,
 * the move file action will be triggered.
 * Asynchronous mode
 *
 * @param {string} FileName
 * @param {string} newFileName
 * @returns {*}  {Promise<any>}
 */
export function reFile(fileName: string, newFileName: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.rename(fileName, newFileName, err => {
            return err ? reject(err) : fulfill(null);
        });
    });
}

/**
 * Delete the file p.
 * Asynchronous mode
 *
 * @param {string} p
 * @returns {*}  {Promise<any>}
 */
export function rmFile(p: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.unlink(p, err => {
            return err ? reject(err) : fulfill(null);
        });
    });
}

/**
 * According to the path p to create a folder,
 * p contains multi-level new path will be automatically recursively created.
 * Asynchronous mode
 *
 * @param {string} p
 * @param {string} [mode='0777']
 * @returns {Promise<any>}
 */
export function mkDir(p: string, mode = "0777"): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.stat(path.dirname(p), (err, res) => {
            if (err || !res.isDirectory()) reject(err);

            fs.mkdir(p, { recursive: true, mode }, e => {
                return e ? reject(e) : fulfill(null);
            });
        });
    });
}

/**
 * Recursively read the path under the p folder.
 * Asynchronous mode
 *
 * @param {string} p
 * @param {*} filter
 * @param {string} [prefix='']
 * @returns {*}  {Promise<any>}
 */
export function readDir(p: string, filter: any, prefix = ""): Promise<any> {
    filter =
        filter ||
        function (x: any) {
            return x[0] !== ".";
        };

    const dir = path.join(p, prefix);
    return new Promise((fulfill, reject) => {
        fs.stat(path.dirname(dir), (err, res) => {
            if (err || !res.isDirectory()) reject(err);

            fs.readdir(dir, "utf-8", (e, res) => {
                return e ? reject(e) : fulfill(res);
            });
        });
    });
}

/**
 * Subfolder of path p are recursively deleted. When reserve is true, the top-level folder is deleted
 * Asynchronous mode
 *
 * @param {string} p
 * @param {boolean} reserve
 * @returns {*}
 */
export function rmDir(p: string, reserve: boolean) {
    return new Promise((fulfill, reject) => {
        fs.rmdir(p, { maxRetries: 3, recursive: reserve }, err => {
            return err ? reject(err) : fulfill(null);
        });
    });
}

/**
 * Modify the permissions of the file or folder p.
 * Asynchronous mode
 *
 * @param {string} p
 * @param {string} [mode='777']
 * @returns {*}  {Promise<any>}
 */
export function chmod(p: string, mode = "777"): Promise<any> {
    return new Promise((fulfill, reject) => {
        fs.stat(p, (err, res) => {
            if (err) reject(err);

            fs.chmod(p, mode, err => {
                return err ? reject(err) : fulfill(res);
            });
        });
    });
}
