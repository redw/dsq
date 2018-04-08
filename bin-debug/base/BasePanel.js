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
 * 游戏中弹出面板
 *
 * Created by hh on 2017/10/19 0010.
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    /**
     *
     * @param data
     * @param option
     */
    function BasePanel(data, option) {
        var _this = _super.call(this, data) || this;
        /** 层级 */
        _this.layer = "layer";
        /** 灰底 */
        _this.modal = 1;
        /** 灰底ALPHA */
        _this.modalAlpha = 0.6;
        /** 存在模式 0:永远存在 1:关闭即销毁 */
        _this.autoDispose = 0;
        /** 打开特效 0:没有动画 1:中间弹出 2:上进 3:下进 4:左进 5:右进 */
        _this.effectType = 0;
        _this.effectType = Util.getPropValue(option, "effectType", 1);
        _this.layer = Util.getPropValue(option, "layer", PanelLayer.TOP_LAYER);
        _this.autoDispose = Util.getPropValue(option, "autoDispose", 0);
        _this.modal = Util.getPropValue(option, "modal", 1);
        _this.modalAlpha = Util.getPropValue(option, "modalAlpha", 0.6);
        return _this;
    }
    BasePanel.prototype.$onClick = function (e) {
        var name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Game.closePanel(this);
        }
        else {
            this.onClick(name, e);
        }
    };
    return BasePanel;
}(ExComponent));
__reflect(BasePanel.prototype, "BasePanel");
//# sourceMappingURL=BasePanel.js.map