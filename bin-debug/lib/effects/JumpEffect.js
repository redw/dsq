var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JumpEffect = (function () {
    function JumpEffect(target) {
        this.startY = 0;
        this.target = target;
        this.startY = this.target.y;
    }
    JumpEffect.prototype.start = function (options) {
        var target = this.target;
        var startY = this.startY;
        var offY = Util.getPropValue(options, "offY", 20);
        var loop = Util.getPropValue(options, "loop", true);
        var upTime = Util.getPropValue(options, "upTime", 2000);
        var downTome = Util.getPropValue(options, "downTime", 2000);
        var waitTime = Util.getPropValue(options, "waitTime", 0);
        var tween = egret.Tween.get(target, { loop: loop });
        tween.to({ y: startY - offY }, upTime, egret.Ease.cubicIn).wait(waitTime).
            to({ y: startY }, downTome, egret.Ease.cubicOut);
    };
    JumpEffect.prototype.end = function () {
        egret.Tween.removeTweens(this.target);
        this.target.y = this.startY;
        this.target = null;
    };
    return JumpEffect;
}());
__reflect(JumpEffect.prototype, "JumpEffect");
//# sourceMappingURL=JumpEffect.js.map