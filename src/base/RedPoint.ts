class RedPoint extends ExComponent {
    public static pool = new ObjPool(RedPoint);
    private countLbl:eui.Label;
    private bgImg:eui.Image;
    private jump = true;
    private timeId = 0;

    public constructor() {
        super();
        this.touchEnabled = false;
        this.touchChildren = false;
        this.skinName = "RedPointSkin";
        this.setJump(true);
    }

    public active() {
        let data = this.data;
        this.countLbl.text = String(data) || "";
        this.setJump(true);
    }

    public setJump(bool:boolean):void {
        this.jump = bool;
        this.startEffect();
    }

    private startEffect() {
        if (this.jump) {
            egret.Tween.get(this.countLbl)
                .to({y:(-20)}, 200, egret.Ease.sineIn)
                .to({y:0}, 500, egret.Ease.bounceOut);

            egret.Tween.get(this.bgImg)
                .to({y:-20}, 200, egret.Ease.sineIn)
                .to({y:0}, 500, egret.Ease.bounceOut);

            if (this.timeId) {
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            if (!this.timeId) {
                this.timeId = Game.registerTimer(this.startEffect, this, 4000 + Math.random() * 2000, 0);
            }
        } else {
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
    }

    public release() {
        this.setJump(false);
        DisplayUtil.removeFromParent(this);
    }

}