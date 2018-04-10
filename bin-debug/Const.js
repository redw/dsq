var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Const = (function () {
    function Const() {
    }
    Const.RES_VER = "";
    Const.JSON_VER = "";
    Const.SKIN_VER = "";
    return Const;
}());
__reflect(Const.prototype, "Const");
