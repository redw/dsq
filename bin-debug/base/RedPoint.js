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
var RedPoint = (function (_super) {
    __extends(RedPoint, _super);
    function RedPoint() {
        var _this = _super.call(this) || this;
        _this.jump = true;
        _this.timeId = 0;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.skinName = "RedPointSkin";
        _this.setJump(true);
        return _this;
    }
    RedPoint.prototype.active = function () {
        var data = this.data;
        this.countLbl.text = String(data) || "";
        this.setJump(true);
    };
    RedPoint.prototype.setJump = function (bool) {
        this.jump = bool;
        this.startEffect();
    };
    RedPoint.prototype.startEffect = function () {
        if (this.jump) {
            egret.Tween.get(this.countLbl)
                .to({ y: (-20) }, 200, egret.Ease.sineIn)
                .to({ y: 0 }, 500, egret.Ease.bounceOut);
            egret.Tween.get(this.bgImg)
                .to({ y: -20 }, 200, egret.Ease.sineIn)
                .to({ y: 0 }, 500, egret.Ease.bounceOut);
            if (this.timeId) {
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            if (!this.timeId) {
                this.timeId = Game.registerTimer(this.startEffect, this, 4000 + Math.random() * 2000, 0);
            }
        }
        else {
            if (this.timeId) {
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            this.bgImg.x = 0;
            this.bgImg.y = 0;
            this.countLbl.y = 0;
            egret.Tween.removeTweens(this.countLbl);
            egret.Tween.removeTweens(this.bgImg);
        }
    };
    RedPoint.prototype.release = function () {
        this.setJump(false);
        DisplayUtil.removeFromParent(this);
    };
    RedPoint.pool = new ObjPool(RedPoint);
    return RedPoint;
}(ExComponent));
__reflect(RedPoint.prototype, "RedPoint");
//# sourceMappingURL=RedPoint.js.map