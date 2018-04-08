class EXItemRenderer extends eui.ItemRenderer {
    public constructor() {
        super();
    }

    public addToStage() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public removeFromStage() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public onClick(e:egret.TouchEvent) {

    }

    $onAddToStage(stage:egret.Stage, nestLevel:number) {
        super.$onAddToStage(stage, nestLevel);
        this.addToStage();
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.removeFromStage();
    }
}