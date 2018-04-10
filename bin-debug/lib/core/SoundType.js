var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundType = (function () {
    function SoundType() {
    }
    SoundType.SOUND = 0;
    SoundType.EFFECT = 1;
    return SoundType;
}());
__reflect(SoundType.prototype, "SoundType");
