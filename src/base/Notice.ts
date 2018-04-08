/**
 * 浮动文本
 * @author j
 * 2016/3/4
 */
class Notice extends ExComponent {
    public static show(msg:any):void {
        let notice:Notice = new Notice();
        notice.setData(msg);
        Game.stage.addChild(notice);
    }

    desLbl:eui.Label;
    public constructor() {
        super();
        this.skinName = "NoticeSkin";
    }

    public active():void {
        let msg = this.data;
        if (!this.desLbl) {
            window.alert(msg);
            DisplayUtil.removeFromParent(this);
        } else {
            if (typeof(msg) == "string") {
                this.desLbl.text = msg;
            } else {
                this.desLbl.textFlow = msg;
            }

            this.x = (Game.stage.stageWidth - this.width ) / 2;
            this.y = Game.stage.stageHeight / 3;
            this.alpha = 0;

            egret.Tween.get(this).to({alpha:1, y:this.y - 60}, 300).call(function ():void {
                egret.Tween.get(this).wait(1000).to({alpha:0, y:this.y - 60}, 300).call(function ():void {
                    DisplayUtil.removeFromParent(this);
                }, this);
            }, this);
        }
    }
}