var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PanelLayer = (function () {
    function PanelLayer() {
    }
    PanelLayer.BOTTOM_LAYER = "bottom";
    PanelLayer.TOP_LAYER = "top";
    PanelLayer.ALERT_LAYER = "alert";
    return PanelLayer;
}());
__reflect(PanelLayer.prototype, "PanelLayer");
var PanelEffect = (function () {
    function PanelEffect() {
    }
    /** 没有动画 */
    PanelEffect.NO = 0;
    /** 中间弹出 */
    PanelEffect.Center = 1;
    /** 上进*/
    PanelEffect.Top = 2;
    /** 下进 */
    PanelEffect.Bottom = 3;
    /** 左进 */
    PanelEffect.Left = 4;
    /** 右进 */
    PanelEffect.Right = 5;
    return PanelEffect;
}());
__reflect(PanelEffect.prototype, "PanelEffect");
//# sourceMappingURL=PanelEnum.js.map