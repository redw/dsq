/**
 * 数组工具
 *
 * Created by hh on 2017/10/17.
 */
var ArrayUtil;
(function (ArrayUtil) {
    /**
     * 从数组中随机得到一个元素
     * @param arr
     * @param startIndex
     * @param length
     * @returns {null}
     */
    function getRandomItem(arr, startIndex, length) {
        if (arr) {
            if (startIndex === undefined) {
                startIndex = 0;
            }
            if (length == undefined) {
                length = arr.length;
            }
            var randomIndex = startIndex + Math.random() * length >> 0;
            return (arr[randomIndex] === undefined) ? null : arr[randomIndex];
        }
    }
    ArrayUtil.getRandomItem = getRandomItem;
    /**
     * 从数组中随机删除一个元素
     * @param objects
     * @param startIndex
     * @param length
     * @returns {null}
     */
    function removeRandomItem(objects, startIndex, length) {
        if (objects) {
            if (startIndex === undefined) {
                startIndex = 0;
            }
            if (length == undefined) {
                length = objects.length;
            }
            var randomIndex = startIndex + Math.floor(Math.random() * length);
            if (randomIndex < objects.length) {
                var removed = objects.splice(randomIndex, 1);
                return (removed[0] === undefined) ? null : removed[0];
            }
            else {
                return null;
            }
        }
    }
    ArrayUtil.removeRandomItem = removeRandomItem;
    /**
     * 从数组中删除元素
     * @param objects
     * @param value
     * @returns {boolean}
     */
    function removeItem(objects, value) {
        if (objects) {
            var index = objects.indexOf(value);
            if (index >= 0) {
                objects.splice(index, 1);
                return true;
            }
        }
        return false;
    }
    ArrayUtil.removeItem = removeItem;
    /**
     * 一维变二维数组
     * @param arr
     * @param step
     */
    function oneToTwoDim(arr, step) {
        var result = [];
        var len = arr.length;
        var j = 0;
        for (var i = 0; i < len; i++) {
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
    ArrayUtil.oneToTwoDim = oneToTwoDim;
    /**
     * 数组填充
     * @param len   数组长度
     * @param value 填充默认值
     * @returns {any[]}
     */
    function fill(len, value) {
        if (len === void 0) { len = 1; }
        if (value === void 0) { value = 0; }
        var result = Array(len);
        for (var i = 0; i < len; i++) {
            result[i] = value;
        }
        return result;
    }
    ArrayUtil.fill = fill;
    /**
     * 从start到end的数组
     * @param start
     * @param end
     * @returns {Array}
     */
    function numberArray(start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }
    ArrayUtil.numberArray = numberArray;
    /**
     * 随机打乱数组
     * @param array
     */
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    ArrayUtil.shuffle = shuffle;
    /**
     * 交换元素
     * @param arr
     * @param a
     * @param b
     */
    function swap(arr, a, b) {
        var len = arr ? arr.length : 0;
        if (a >= 0 && a < len && b >= 0 && b < len) {
            var temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }
        else {
            console.warn("swap fail");
        }
    }
    ArrayUtil.swap = swap;
    /**
     * 删除数组的第index个元素
     * @param objects
     * @param index
     * @returns {any}
     */
    function spliceOne(objects, index) {
        if (index < objects.length) {
            var len = objects.length - 1;
            var item = objects[index];
            for (var i = index; i < len; i++) {
                objects[i] = objects[i + 1];
            }
            objects.length = len;
            return item;
        }
        return null;
    }
    ArrayUtil.spliceOne = spliceOne;
    function findClosestInSorted(objects, value) {
        if (!objects.length) {
            return NaN;
        }
        else if (objects.length === 1 || value < objects[0]) {
            return objects[0];
        }
        var i = 1;
        while (objects[i] < value) {
            i++;
        }
        var low = objects[i - 1];
        var high = (i < objects.length) ? objects[i] : Number.POSITIVE_INFINITY;
        return ((high - value) <= (value - low)) ? high : low;
    }
    ArrayUtil.findClosestInSorted = findClosestInSorted;
    ;
})(ArrayUtil || (ArrayUtil = {}));
//# sourceMappingURL=ArrayUtil.js.map