/**
 * @ Author: Hanrea
 * @ version: 2023-03-06 13:14:21
 * @ copyright: Vecmat (c) - <hi(at)vecmat.com>
 */
import moment from "moment";
import lodash from "lodash";

/**
 *
 *
 * @param {string} f
 * @returns {*}
 */
const dateFn = function (f: string) {
    // let Week = ['日', '一', '二', '三', '四', '五', '六'];
    f = f.replace(/yyyy/, "YYYY");
    f = f.replace(/yy/, "YY");
    if (f.search(/^YY+.mm/) > -1) f = f.replace(/mm/, "MM");

    f = f.replace(/mi|MI/, "mm");
    // f = f.replace(/w|W/g, Week[d.getDay()]);
    f = f.replace(/dd/, "DD");
    return f;
};

/**
 * Date time stamp and formatting
 *
 * @export
 * @param {(number | string | undefined)} date
 * @param {string} [format] defaults  'YYYY-MM-DD hh:mi:ss.SSS'
 * @param {number} [offset] defaults  8
 * @returns {(number | string)}
 */
export function dateTime(date?: number | string | undefined, format?: string, offset = 8): number | string {
    if (format === undefined) {
        // datetime() => now timestamp
        if (lodash.isString(date)) {
            // datetime('2017-01-01') => timestamp
            return Math.floor(new Date(date).getTime() / 1000);
        } else {
            return Math.floor(Date.now() / 1000);
        }
    } else {
        if (format) format = dateFn(format);
        else format = "YYYY-MM-DD HH:mm:ss.SSS";

        if (date && lodash.isNumber(date)) {
            if (date < 10000000000)
                return moment
                    .unix(date as number)
                    .utcOffset(offset)
                    .format(format);
            else return moment(date).utcOffset(offset).format(format);
        }
        if (date && lodash.isString(date))
            return moment(new Date(Date.parse(date as string)))
                .utcOffset(offset)
                .format(format);

        return moment().utcOffset(offset).format(format);
    }
}
