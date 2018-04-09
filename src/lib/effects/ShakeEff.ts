/**
 * 抖动效果
 */
class ShakeEff extends egret.EventDispatcher{
    private cb:Function;
    private cbObj:any;
    private target:egret.DisplayObject;

    private startX = 0;
    private startY = 0;
    private isShaking = false;
    private intensity = 1;
    private duration = 1000;
    private timerId = 0;

    public constructor(target:egret.DisplayObject, cb?:Function, cbObj?:any) {
        super();
        this.target = target;
        this.cb = cb;
        this.cbObj = cbObj;
    }

    public start(duration = 1000, intensity =  0.05): void {
        if (!this.isShaking){
            this.startX = this.target.x;
            this.startY = this.target.y;
            this.isShaking = true;
            this.duration = duration;
            this.intensity = intensity;
            this.timerId = Game.loop.registerEnterFrame(this.update, this);
        }
    }

    private update(time:number) {
        let intensity = this.intensity;
        this.duration -= time;
        if (this.duration > 0) {
            let offX = intensity * (this.target.width) *(Math.random() *  2 - 1);
            let offY = intensity * (this.target.height) * (Math.random() *  2 -  1);
            this.target.x = this.startX + offX;
            this.target.y = this.startY + offY;
        } else {
            this.end();
        }
    }

    public end(): void {
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
    }

    public dispose(){
        this.end();
        this.target = null;
    }
}
