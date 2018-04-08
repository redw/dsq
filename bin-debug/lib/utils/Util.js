/**
 * 一些常用的工具
 *
 * Created by hh on 2017/6/13 0013.
 */
var Util;
(function (Util) {
    /**
     * 合并对象
     * @param from
     * @param to
     * @returns {any}
     */
    function mixin(from, to) {
        if (!from || typeof (from) !== "object") {
            return to;
        }
        for (var key in from) {
            var o = from[key];
            var type = typeof (from[key]);
            if (!from[key] || type !== "object") {
                if (to === null) {
                    to = new from.constructor();
                }
                to[key] = from[key];
            }
            else {
                if (typeof (to[key]) === type) {
                    to[key] = mixin(from[key], to[key]);
                }
                else {
                    to[key] = mixin(from[key], new o.constructor());
                }
            }
        }
        return to;
    }
    Util.mixin = mixin;
    /**
     * 比较对象的不同
     * @param from
     * @param to
     * @param diff
     * @returns {any}
     */
    function objDiff(from, to, diff) {
        if (!diff) {
            diff = {};
        }
        for (var key in from) {
            var value = from[key];
            var typeF = typeof value;
            if (isObject(value)) {
                if (!diff[key]) {
                    diff[key] = new value.constructor();
                }
                objDiff(value, to || null, diff[key]);
            }
            else {
                if (!to) {
                    diff[key] = value;
                }
                else {
                    var typeT = typeof to[key];
                    if (typeF != typeT) {
                        diff[key] = value;
                    }
                    else {
                        if (value != to[key]) {
                            diff[key] = value;
                        }
                    }
                }
            }
        }
        return diff;
    }
    Util.objDiff = objDiff;
    /**
     * @param obj
     * @param out
     * @returns {any[]}
     */
    function objToArr(obj, out) {
        if (!out) {
            out = [];
        }
        if (obj) {
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                out.push(obj[key]);
            }
        }
        return out;
    }
    Util.objToArr = objToArr;
    function getRandomInt(from, end) {
        var len = end - from;
        var value = from;
        if (len > 0) {
            value = from + Math.round(Math.random() * len);
        }
        return value;
    }
    Util.getRandomInt = getRandomInt;
    function getPropValue(source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }
        else if (source.hasOwnProperty(key) || typeof key === 'number') {
            return source[key];
        }
        else if (key.indexOf('.') >= 0) {
            var keys = key.split('.');
            var parent_1 = source;
            var value = defaultValue;
            for (var i = 0, len = keys.length; i < len; i++) {
                if (parent_1 && parent_1.hasOwnProperty(keys[i])) {
                    value = parent_1[keys[i]];
                    parent_1 = parent_1[keys[i]];
                }
                else {
                    value = defaultValue;
                    break;
                }
            }
            return value;
        }
        else {
            return defaultValue;
        }
    }
    Util.getPropValue = getPropValue;
    function isObject(value) {
        var type = typeof value;
        return type === 'function' || type === 'object' && !!value;
    }
    Util.isObject = isObject;
    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
    Util.isArray = isArray;
})(Util || (Util = {}));
//# sourceMappingURL=Util.js.map