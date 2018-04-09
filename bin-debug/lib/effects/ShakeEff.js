var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 抖动效果
 */
var ShakeEff = (function (_super) {
    __extends(ShakeEff, _super);
    function ShakeEff(target, cb, cbObj) {
        var _this = _super.call(this) || this;
        _this.startX = 0;
        _this.startY = 0;
        _this.isShaking = false;
        _this.intensity = 1;
        _this.duration = 1000;
        _this.timerId = 0;
        _this.target = target;
        _this.cb = cb;
        _this.cbObj = cbObj;
        return _this;
    }
    ShakeEff.prototype.start = function (duration, intensity) {
        if (duration === void 0) { duration = 1000; }
        if (intensity === void 0) { intensity = 0.05; }
        if (!this.isShaking) {
            this.startX = this.target.x;
            this.startY = this.target.y;
            this.isShaking = true;
            this.duration = duration;
            this.intensity = intensity;
            this.timerId = Game.loop.registerEnterFrame(this.update, this);
        }
    };
    ShakeEff.prototype.update = function (time) {
        var intensity = this.intensity;
        this.duration -= time;
        if (this.duration > 0) {
            var offX = intensity * (this.target.width) * (Math.random() * 2 - 1);
            var offY = intensity * (this.target.height) * (Math.random() * 2 - 1);
            this.target.x = this.startX + offX;
            this.target.y = this.startY + offY;
        }
        else {
            this.end();
        }
    };
    ShakeEff.prototype.end = function () {
        if (this.isShaking) {
            this.isShaking = false;
            this.target.x = this.startX;
            this.target.y = this.startY;
            if (this.timerId) {
                Game.loop.clearTimer(this.timerId);
                this.timerId = 0;
            }
            if (this.cb) {
                this.cb.call(this.cbObj);
            }
            this.dispatchEventWith(egret.Event.COMPLETE);
            this.cb = null;
            this.cbObj = null;
        }
    };
    ShakeEff.prototype.dispose = function () {
        this.end();
        this.target = null;
    };
    return ShakeEff;
}(egret.EventDispatcher));
__reflect(ShakeEff.prototype, "ShakeEff");
//# sourceMappingURL=ShakeEff.js.map