/**
 * 数组工具
 *
 * Created by hh on 2017/10/17.
 */
module ArrayUtil {
    /**
     * 从数组中随机得到一个元素
     * @param arr
     * @param startIndex
     * @param length
     * @returns {null}
     */
    export function getRandomItem(arr:any[], startIndex?:number, length?:number) {
        if (arr) {
            if (startIndex === undefined) {
                startIndex = 0;
            }
            if (length == undefined) {
                length = arr.length;
            }
            let randomIndex = startIndex + Math.random() * length >> 0;
            return (arr[randomIndex] === undefined) ? null : arr[randomIndex];
        }
    }

    /**
     * 从数组中随机删除一个元素
     * @param objects
     * @param startIndex
     * @param length
     * @returns {null}
     */
    export function removeRandomItem(objects:any[], startIndex?:number, length?:number) {
        if (objects) {
            if (startIndex === undefined) {
                startIndex = 0;
            }
            if (length == undefined) {
                length = objects.length;
            }
            let randomIndex = startIndex + Math.floor(Math.random() * length);
            if (randomIndex < objects.length) {
                let removed = objects.splice(randomIndex, 1);
                return (removed[0] === undefined) ? null : removed[0];
            } else {
                return null;
            }
        }
    }

    /**
     * 从数组中删除元素
     * @param objects
     * @param value
     * @returns {boolean}
     */
    export function removeItem(objects:any[], value:any) {
        if (objects) {
            let index = objects.indexOf(value);
            if (index >= 0) {
                objects.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * 一维变二维数组
     * @param arr
     * @param step
     */
    export function oneToTwoDim(arr:any[], step:number) {
        let result:any[][] = [];
        let len = arr.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            if (!result[j]) {
                result[j] = [];
            }
            result[j].push(arr[i]);
            if (result[j].length >= step) {
                j++;
            }
        }
        return result;
    }

    /**
     * 数组填充
     * @param len   数组长度
     * @param value 填充默认值
     * @returns {any[]}
     */
    export function fill(len = 1, value:any=0) {
        let result = Array(len);
        for (let i = 0; i < len; i++) {
            result[i] = value;
        }
        return result;
    }

    /**
     * 从start到end的数组
     * @param start
     * @param end
     * @returns {Array}
     */
    export function numberArray(start:number, end:number) {
        let result = [];
        for (let i =  start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    /**
     * 随机打乱数组
     * @param array
     */
    export function shuffle(array:any) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * 交换元素
     * @param arr
     * @param a
     * @param b
     */
    export function swap(arr:any[], a:number, b:number) {
        let len = arr ? arr.length : 0;
        if (a >= 0 && a < len && b >= 0 && b < len) {
            let temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        } else {
            console.warn("swap fail");
        }
    }

    /**
     * 删除数组的第index个元素
     * @param objects
     * @param index
     * @returns {any}
     */
    export function spliceOne(objects:any[], index) {
        if (index < objects.length) {
            let len = objects.length - 1;
            let item = objects[index];
            for (let i = index; i < len; i++) {
                objects[i] = objects[i + 1];
            }
            objects.length = len;
            return item;
        }
        return null;
    }

    export function findClosestInSorted(objects:number[], value:number) {
        if (!objects.length) {
            return NaN;
        } else if (objects.length === 1 || value < objects[0]) {
            return objects[0];
        }
        var i = 1;
        while (objects[i] < value) {
            i++;
        }
        var low = objects[i - 1];
        var high = (i < objects.length) ? objects[i] : Number.POSITIVE_INFINITY;
        return ((high - value) <= (value - low)) ? high : low;
    };
}