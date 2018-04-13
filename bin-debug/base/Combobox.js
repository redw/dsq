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
var Combobox = (function (_super) {
    __extends(Combobox, _super);
    function Combobox() {
        var _this = _super.call(this) || this;
        // this.skinName = ComboboxSkin;
        _this.init();
        return _this;
    }
    Combobox.prototype.init = function () {
        this.list.itemRenderer = ComboboxItem;
    };
    Combobox.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this.list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onSelect, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Combobox.prototype.onSelect = function (e) {
        if (e.property == "selectedIndex") {
            if (this.back && this.list.selectedItem) {
                this.back.call(this.context, this.list.selectedItem);
                this.parent.removeChild(this);
            }
        }
    };
    Combobox.prototype.onTouchEnd = function (e) {
        var stageX = e.stageX;
        var stageY = e.stageY;
        var point = this.globalPoint;
        if (!point) {
            this.globalPoint = new egret.Point();
            point = this.globalPoint;
        }
        this.localToGlobal(0, 0, this.globalPoint);
        var minX = point.x;
        var minY = point.y + 20;
        var maxX = point.x + this.width;
        var maxY = point.y + this.height;
        var inside = stageX >= minX && stageX <= maxX && stageY >= minY && stageY <= maxY;
        if (!inside) {
            this.parent.removeChild(this);
        }
    };
    Object.defineProperty(Combobox.prototype, "data", {
        set: function (arr) {
            this.list.dataProvider = new eui.ArrayCollection(arr);
        },
        enumerable: true,
        configurable: true
    });
    Combobox.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Combobox.prototype.setParent = function (parent) {
        if (this.parent != parent) {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            if (parent) {
                parent.addChild(this);
            }
        }
    };
    Combobox.prototype.setBack = function (back, context) {
        this.back = back;
        this.context = context;
    };
    Combobox.prototype.dispose = function () {
    };
    Combobox.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    return Combobox;
}(eui.Component));
__reflect(Combobox.prototype, "Combobox");
var ComboboxItem = (function (_super) {
    __extends(ComboboxItem, _super);
    function ComboboxItem() {
        return _super.call(this) || this;
        // this.skinName = ComboboxItemRenSkin;
    }
    ComboboxItem.prototype.dataChanged = function () {
        var data = this.data;
        if (this.iconImg) {
            this.iconImg.source = data.icon;
        }
        this.contentLbl.text = data.name || data.label;
    };
    return ComboboxItem;
}(eui.ItemRenderer));
__reflect(ComboboxItem.prototype, "ComboboxItem");
