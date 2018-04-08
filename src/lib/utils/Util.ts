/**
 * 一些常用的工具
 *
 * Created by hh on 2017/6/13 0013.
 */
module Util {
    /**
     * 合并对象
     * @param from
     * @param to
     * @returns {any}
     */
    export function mixin(from:any, to:any) {
        if (!from || typeof (from) !== "object") {
            return to;
        }
        for (let key in from) {
            let o = from[key];
            let type = typeof (from[key]);
            if (!from[key] || type !== "object") {
                if (to === null) {
                    to = new from.constructor();
                }
                to[key] = from[key];
            } else {
                if (typeof (to[key]) === type) {
                    to[key] = mixin(from[key], to[key]);
                } else {
                    to[key] = mixin(from[key], new o.constructor());
                }
            }
        }
        return to;
    }

    /**
     * 比较对象的不同
     * @param from
     * @param to
     * @param diff
     * @returns {any}
     */
    export function objDiff(from:any, to:any, diff?:any) {
        if (!diff) {
            diff = {};
        }
        for (let key in from) {
            let value = from[key];
            let typeF = typeof value;
            if (isObject(value)) {
                if (!diff[key]) {
                    diff[key] = new value.constructor();
                }
                objDiff(value, to || null, diff[key]);
            } else {
                if (!to) {
                   diff[key] = value;
                } else {
                    let typeT = typeof to[key];
                    if (typeF != typeT) {
                        diff[key] = value;
                    } else {
                        if (value != to[key]) {
                            diff[key] = value;
                        }
                    }
                }
            }
        }
        return diff;
    }

    /**
     * @param obj
     * @param out
     * @returns {any[]}
     */
    export function objToArr(obj:any, out?:any[]) {
        if (!out) {
            out = [];
        }
        if (obj) {
            let keys = Object.keys(obj);
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                out.push(obj[key]);
            }
        }
        return out;
    }

    export function getRandomInt(from:number, end:number) {
        let len = end - from;
        let value = from;
        if (len > 0) {
            value = from + Math.round(Math.random() * len);
        }
        return value;
    }

    export function getPropValue(source:any, key:string, defaultValue?:any) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        } else if (source.hasOwnProperty(key) || typeof key === 'number') {
            return source[key];
        } else if (key.indexOf('.') >= 0) {
            let keys = key.split('.');
            let parent = source;
            let value = defaultValue;
            for (let i = 0, len = keys.length; i < len; i++) {
                if (parent && parent.hasOwnProperty(keys[i])) {
                    value = parent[keys[i]];
                    parent = parent[keys[i]];
                } else {
                    value = defaultValue;
                    break;
                }
            }
            return value;
        } else {
            return defaultValue;
        }
    }

    export function isObject(value:any) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }

    export function isArray(value:any) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
}