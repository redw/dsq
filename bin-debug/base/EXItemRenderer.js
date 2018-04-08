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
var EXItemRenderer = (function (_super) {
    __extends(EXItemRenderer, _super);
    function EXItemRenderer() {
        return _super.call(this) || this;
    }
    EXItemRenderer.prototype.addToStage = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    EXItemRenderer.prototype.removeFromStage = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    EXItemRenderer.prototype.onClick = function (e) {
    };
    EXItemRenderer.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this.addToStage();
    };
    EXItemRenderer.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.removeFromStage();
    };
    return EXItemRenderer;
}(eui.ItemRenderer));
__reflect(EXItemRenderer.prototype, "EXItemRenderer");
//# sourceMappingURL=EXItemRenderer.js.map