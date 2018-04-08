/**
 * 字符串工具
 * @author j
 *
 */
module StringUtil {
    export function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    export function getCharLength(str:string):number {
        var length:number = 0;

        for (var i:number = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                length = length + 2;
            }
            else {
                length++;
            }
        }
        return length;
    }

    export function getQueryString(str:string):string {
        var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
        var result = window.location.search.substr(1).match(reg);

        return result != null ? eval(result[2]) : null;
    }

    export function decodeName(name:any, showAll:boolean=false):string {
        var result = "玩家";
        if (typeof name == "object") {
            result = "玩家:" + name.uid;
        } else {
            if (name) {
                try {
                    result = decodeURIComponent(name);
                }
                catch (e) {
                    result = "玩家";
                }
            }
            result = result.replace(new RegExp("/( )/g"), "");
            if (result.length > 8 && !showAll) {
                result = result.substr(0, 6) + "...";
            }
        }
        return result;
    }

     export function decodeStr(str:any, err = "") {
        let result = err;
        if (str) {
            try {
                result = Base64.utf8to16(Base64.base64decode(str));
            }
            catch (e) {
                result = err;
            }
        }
        return result;
    }

    export function convertImgURLTo64(url:string):string {
        return url.replace(/\/0$/, "\/64");
    }

    export function timeToString(time:number, showHour:boolean = true):string {
        if (time < 0) {
            time = 0;
        }

        var hou:number = Math.floor(time / 3600);
        var min:number = Math.floor((time % 3600) / 60);
        var sec:number = Math.floor(time % 60);

        showHour = hou > 0;


        if (showHour) {
            return StringUtil.unshiftZero(hou, 2) + ":" + StringUtil.unshiftZero(min, 2) + ":" + StringUtil.unshiftZero(sec, 2);
        }
        else {
            return StringUtil.unshiftZero(min, 2) + ":" + StringUtil.unshiftZero(sec, 2);
        }
    }

    export function timeToString2(time:number):string {
        if (time < 0) {
            time = 0;
        }

        var day:number = Math.floor(time / 3600 / 24);
        time = time - day * 3600 * 24;
        var hou:number = Math.floor(time / 3600);
        var min:number = Math.floor((time % 3600) / 60);
        var sec:number = Math.floor(time % 60);

        if (day > 0) {
            return StringUtil.unshiftZero(day, 1) + "天" + StringUtil.unshiftZero(hou, 2) + "时" + StringUtil.unshiftZero(min, 2) + "分" + StringUtil.unshiftZero(sec, 2) + "秒";
        }
        else if (hou > 0) {
            return StringUtil.unshiftZero(hou, 2) + "时" + StringUtil.unshiftZero(min, 2) + "分" + StringUtil.unshiftZero(sec, 2) + "秒";
        }
        else {
            return StringUtil.unshiftZero(min, 2) + "分" + StringUtil.unshiftZero(sec, 2) + "秒";
        }
    }

    export function dateToString(date:Date, showSecond?:boolean):string {
        if (showSecond) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "
                + StringUtil.unshiftZero(date.getHours(), 2) + ":" + StringUtil.unshiftZero(date.getMinutes(), 2) + ":" + StringUtil.unshiftZero(date.getSeconds(), 2);
        }
        else {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "
                + StringUtil.unshiftZero(date.getHours(), 2) + ":" + StringUtil.unshiftZero(date.getMinutes(), 2);
        }
    }

    export function unshiftZero(value:number, toLength:number):string {
        var str:string = value.toString();

        while (str.length < toLength) {
            str = "0" + str;
        }
        return str;
    }

    export function toFixed(value:number, fractionDigits?:number):number {
        return value ? parseFloat(value.toFixed(fractionDigits ? fractionDigits : 0)) : 0;
    }

    export function addWarp(text:string, limit:number) {
        if (text == null) {
            return "";
        }
        var len = 0;
        for (var i = 0; i < text.length; i++) {
            var c = text.charCodeAt(i);
            if (c == 10) {
                len = 0;
            }
            else {
                if (c < 0x7F) {
                    len++;
                }
                else if (c >= 0x80 && c < 0x7FF) {
                    len += 2;
                }
                else if ((c >= 0x800 && c < 0xD7FF) || (c >= 0xE000 && c < 0xFFFF)) {
                    len += 2;
                }
                else if (c >= 0x10000 && c < 0x10FFFF) {
                    len += 2;
                }

                if (len >= limit) {
                    text = text.substr(0, i + 1) + "\n" + text.substr(i + 1);
                    len = 0;
                    i++;
                }
            }
        }
        return text;
    }

    /**
     * 替换{0},{1}格式
     *
     * @param des
     * @param param
     * @returns {string}
     */
    export function format(des:string, ...param) {
        let result = des;
        if (des && des.indexOf(`{0}`) > -1) {
            let len = param.length;
            for (let i = 0; i < len; i++) {
                result = result.replace(`{${i}}`, param[i]);
            }
        }
        return result || "";
    }
}