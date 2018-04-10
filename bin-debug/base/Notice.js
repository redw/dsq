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
 * 浮动文本
 * @author j
 * 2016/3/4
 */
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super.call(this) || this;
        _this.skinName = "NoticeSkin";
        return _this;
    }
    Notice.show = function (msg) {
        var notice = new Notice();
        notice.setData(msg);
        Game.stage.addChild(notice);
    };
    Notice.prototype.active = function () {
        var msg = this.data;
        if (!this.desLbl) {
            window.alert(msg);
            DisplayUtil.removeFromParent(this);
        }
        else {
            if (typeof (msg) == "string") {
                this.desLbl.text = msg;
            }
            else {
                this.desLbl.textFlow = msg;
            }
            this.x = (Game.stage.stageWidth - this.width) / 2;
            this.y = Game.stage.stageHeight / 3;
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1, y: this.y - 60 }, 300).call(function () {
                egret.Tween.get(this).wait(1000).to({ alpha: 0, y: this.y - 60 }, 300).call(function () {
                    DisplayUtil.removeFromParent(this);
                }, this);
            }, this);
        }
    };
    return Notice;
}(ExComponent));
__reflect(Notice.prototype, "Notice");
//# sourceMappingURL=Notice.js.map