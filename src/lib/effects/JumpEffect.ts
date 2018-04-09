class JumpEffect{
    private target:egret.DisplayObject;
    private startY = 0;

    public constructor(target:egret.DisplayObject) {
        this.target = target;
        this.startY = this.target.y;
    }

    public start(options?:any) {
        let target = this.target;
        let startY = this.startY;
        let offY = Util.getPropValue(options, "offY", 20);
        let loop =  Util.getPropValue(options, "loop", true);
        let upTime = Util.getPropValue(options, "upTime", 2000);
        let downTome = Util.getPropValue(options, "downTime", 2000);
        let waitTime = Util.getPropValue(options, "waitTime", 0);
        let tween = egret.Tween.get(target, {loop:loop});
        tween.to({y: startY - offY}, upTime, egret.Ease.cubicIn).wait(waitTime).
        to({y: startY}, downTome, egret.Ease.cubicOut);
    }

    public end() {
        egret.Tween.removeTweens(this.target);
        this.target.y = this.startY;
        this.target = null;
    }
}
