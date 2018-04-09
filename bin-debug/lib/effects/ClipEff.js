var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 翻转效果
 */
var ClipEff = (function () {
    function ClipEff() {
    }
    /**
     * 翻转
     * @param front
     * @param back
     * @param options
     * @param complete
     * @param completeContext
     */
    ClipEff.start = function (front, back, options, complete, completeContext) {
        // flipping speed in milliseconds
        var flipSpeed = Util.getPropValue("options", "flipSpeed", 200);
        // flipping zoom ratio. Simulates the card to be raised when flipping
        var flipZoom = Util.getPropValue("options", "flipZoom", 1.2);
        front.touchEnabled = false;
        back.touchEnabled = false;
        // // first tween: we raise and flip the card
        var frontTween = egret.Tween.get(front);
        frontTween.to({ scaleX: 0, scaleY: flipZoom }, flipSpeed / 2);
        frontTween.call(function () {
            back.visible = true;
            back.scaleX = 0;
            back.scaleY = flipZoom;
            var backTween = egret.Tween.get(back);
            backTween.to({ scaleX: 1, scaleY: 1 }, flipSpeed / 2);
            if (complete) {
                backTween.call(complete, completeContext);
            }
        });
    };
    return ClipEff;
}());
__reflect(ClipEff.prototype, "ClipEff");
//# sourceMappingURL=ClipEff.js.map