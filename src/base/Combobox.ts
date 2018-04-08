class Combobox extends eui.Component {
    list:eui.List;
    globalPoint:egret.Point;
    back:Function;
    context:any;

    public constructor() {
        super();
        // this.skinName = ComboboxSkin;
        this.init();
    }

    public init() {
        this.list.itemRenderer = ComboboxItem;
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number) {
        super.$onAddToStage(stage, nestLevel);
        this.list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onSelect, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    onSelect(e:eui.PropertyEvent) {
       if (e.property == "selectedIndex") {
           if (this.back && this.list.selectedItem) {
               this.back.call(this.context, this.list.selectedItem);
               this.parent.removeChild(this);
           }
       }
    }

    onTouchEnd(e:egret.TouchEvent) {
        let stageX = e.stageX;
        let stageY = e.stageY;
        let point = this.globalPoint;
        if (!point) {
            this.globalPoint = new egret.Point();
            point = this.globalPoint;
        }
        this.localToGlobal(0, 0, this.globalPoint);
        let minX = point.x;
        let minY = point.y + 20;
        let maxX = point.x + this.width;
        let maxY = point.y + this.height;
        let inside = stageX >= minX && stageX <= maxX && stageY >= minY && stageY <= maxY;
        if (!inside) {
            this.parent.removeChild(this);
        }
    }

    public set data(arr:{icon?:string, label:string}[]) {
        this.list.dataProvider = new eui.ArrayCollection(arr);
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public setParent(parent:egret.DisplayObjectContainer) {
        if (this.parent != parent) {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (parent) {
                parent.addChild(this);
            }
        }
    }

    public setBack(back:Function, context:any) {
        this.back = back;
        this.context = context;
    }

    public dispose() {

    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    }
}

class ComboboxItem extends eui.ItemRenderer {
    iconImg:eui.Image;
    contentLbl:eui.Label;

    public constructor() {
        super();
        // this.skinName = ComboboxItemRenSkin;
    }

    public dataChanged(){
        let data = this.data;
        if (this.iconImg) {
            this.iconImg.source = data.icon;
        }
        this.contentLbl.text = data.name || data.label;
    }
}