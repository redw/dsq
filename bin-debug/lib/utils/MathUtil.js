var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    MathUtil.linear = function (start, end, time) {
        return (end - start) * time + start;
    };
    MathUtil.clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
