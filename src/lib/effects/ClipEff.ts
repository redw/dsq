/**
 * 翻转效果
 */
class ClipEff {
    /**
     * 翻转
     * @param front
     * @param back
     * @param options
     * @param complete
     * @param completeContext
     */
    public static start(front:egret.DisplayObject, back:egret.DisplayObject, options?:any, complete?:Function, completeContext?:any) {
        // flipping speed in milliseconds
        let flipSpeed = Util.getPropValue("options", "flipSpeed", 200);
        // flipping zoom ratio. Simulates the card to be raised when flipping
        let flipZoom = Util.getPropValue("options", "flipZoom", 1.2);

        front.touchEnabled = false;
        back.touchEnabled = false;

        // // first tween: we raise and flip the card
        let frontTween = egret.Tween.get(front);
        frontTween.to({scaleX:0, scaleY:flipZoom}, flipSpeed / 2);
        frontTween.call(()=>{
            back.visible = true;
            back.scaleX = 0;
            back.scaleY = flipZoom;
            let backTween = egret.Tween.get(back);
            backTween.to({scaleX:1, scaleY:1}, flipSpeed / 2);
            if (complete) {
                backTween.call(complete, completeContext);
            }
        });
    }
}