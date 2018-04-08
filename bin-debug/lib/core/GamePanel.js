var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HH;
(function (HH) {
    var GamePanel = (function () {
        function GamePanel(stage) {
            this._layerMap = null;
            this._panelMap = null;
            this.stage = stage;
            this._layerMap = {};
            this._panelMap = {};
            var list = [PanelLayer.BOTTOM_LAYER, PanelLayer.TOP_LAYER, PanelLayer.ALERT_LAYER];
            for (var i = 0, len = list.length; i < len; i++) {
                var name_1 = list[i];
                var layer = new eui.Group();
                layer.name = name_1;
                layer.width = stage.stageWidth;
                layer.height = stage.stageHeight;
                layer.touchEnabled = false;
                layer.touchChildren = true;
                stage.addChild(layer);
                this._layerMap[name_1] = layer;
            }
        }
        GamePanel.prototype.getLayer = function (name) {
            return this._layerMap[name];
        };
        GamePanel.prototype.closeLayer = function (name) {
            var group = this.getLayer(name);
            while (group.numChildren) {
                var panel = group.getChildAt(group.numElements - 1);
                if (panel instanceof eui.Image) {
                    DisplayUtil.removeFromParent(panel);
                }
                else {
                    this.hidePanel(panel);
                }
            }
        };
        GamePanel.prototype.getPanelByName = function (name) {
            name = this.getPanelName(name);
            return this._panelMap[name];
        };
        GamePanel.prototype.topPanel = function (panel) {
            if (panel) {
                var layer = this._layerMap[panel.layer];
                var modalName = panel.name + "_modal";
                layer.setChildIndex(panel, layer.numChildren - 1);
                if (layer.getChildByName(modalName)) {
                    layer.setChildIndex(panel, layer.numChildren - 1);
                }
            }
        };
        GamePanel.prototype.isShow = function (name) {
            var panelName = this.getPanelName(name);
            var panel = this._panelMap[panelName];
            return panel && panel.visible && panel.stage;
        };
        GamePanel.prototype.getPanelList = function (layer) {
            var list = [];
            for (var key in this._panelMap) {
                var panel = this._panelMap[key];
                if (panel && panel.layer == layer || !layer) {
                    list.push(panel);
                }
            }
            return list;
        };
        GamePanel.prototype.addModel = function (panel) {
            var layer = this._layerMap[panel.layer];
            if (panel.modal) {
                var modal = DisplayUtil.createStageMask(this.stage);
                modal.name = panel.name + "_modal";
                layer.addChild(modal);
            }
        };
        GamePanel.prototype.showPanel = function (name, data) {
            name = this.getPanelName(name);
            var cls = egret.getDefinitionByName(name);
            var panel = this._panelMap[name];
            if (!panel) {
                panel = new cls();
                panel.name = name;
                this._panelMap[panel.name] = panel;
            }
            if (panel) {
                console.log("[ShowPanel] " + name);
                if (!panel.parent) {
                    this.addModel(panel);
                    var layerName = panel.layer || PanelLayer.TOP_LAYER;
                    var layer = this._layerMap[layerName];
                    layer.addChild(panel);
                    this.addOpenEffect(panel);
                }
                panel.setData(data);
                this.stage.dispatchEventWith("panel_opened", name);
            }
            else {
                console.warn("[ShowPanel] " + name + " error");
            }
            return panel;
        };
        GamePanel.prototype.open = function (name, data) {
            return this.showPanel(name, data);
        };
        GamePanel.prototype.hidePanel = function (name) {
            name = this.getPanelName(name);
            var panel = this._panelMap[name];
            if (panel) {
                console.log("[HidePanel] <<< ", name);
                egret.Tween.removeTweens(panel);
                if (panel.parent) {
                    var layer = this._layerMap[panel.layer];
                    if (panel.modal) {
                        DisplayUtil.removeChildByName(layer, panel.name + "_modal");
                    }
                    panel.sleep();
                    this.addCloseEffect(panel);
                }
                var autoDispose = panel.autoDispose;
                if (autoDispose) {
                    panel.removeFromStage();
                    panel.dispose();
                    delete this._panelMap[name];
                }
            }
            else {
                console.warn("[HidePanel] " + name + " \u5DF2\u7ECF\u5173\u95ED\u4E86");
            }
            this.stage.dispatchEventWith("panel_closed", name);
        };
        GamePanel.prototype.close = function (name) {
            this.hidePanel(name);
        };
        GamePanel.prototype.getPanelName = function (panel) {
            var name = "";
            var t = typeof panel;
            if (t == "string") {
                name = panel;
            }
            else if (panel instanceof eui.Component) {
                name = panel.name;
            }
            else if (panel instanceof Function) {
                name = egret.getQualifiedClassName(panel);
            }
            return name;
        };
        GamePanel.prototype.addOpenEffect = function (panel) {
            egret.Tween.removeTweens(panel);
            var stageWidth = this.stage.stageWidth;
            var stageHeight = this.stage.stageHeight;
            var panelWidth = panel.width;
            var panelHeight = panel.height;
            var initScaleX = panel["preScaleX"] || 1;
            var initScaleY = panel["preScaleY"] || 1;
            switch (panel.effectType) {
                case 1:
                    panel.anchorOffsetX = panel.width / 2;
                    panel.anchorOffsetY = panel.height / 2;
                    panel.x = stageWidth / 2;
                    panel.y = stageHeight / 2;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.alpha = 0;
                    egret.Tween.get(panel).to({ scaleX: initScaleX, scaleY: initScaleY, alpha: 1 }, 300, egret.Ease.backOut);
                    break;
                case 2:
                    panel.y = -stageHeight;
                    egret.Tween.get(panel).to({ y: (stageHeight - panelHeight) * 0.5 }, 300, egret.Ease.backOut);
                    break;
                case 3:
                    panel.y = stageHeight;
                    egret.Tween.get(panel).to({ y: (stageHeight - panelHeight) * 0.5 }, 300, egret.Ease.backOut);
                    break;
                case 4:
                    panel.x = -stageWidth;
                    egret.Tween.get(panel).to({ x: (stageWidth - panelWidth) * 0.5 }, 300, egret.Ease.backOut);
                    break;
                case 5:
                    panel.x = stageWidth;
                    egret.Tween.get(panel).to({ x: (stageWidth - panelWidth) * 0.5 }, 300, egret.Ease.backOut);
                    break;
                case 6:
                    egret.Tween.get(panel).set({ alpha: 0 }).to({ alpha: 1 }, 300);
                    break;
            }
        };
        GamePanel.prototype.addCloseEffect = function (panel) {
            egret.Tween.removeTweens(panel);
            var stageWidth = this.stage.stageWidth;
            var stageHeight = this.stage.stageHeight;
            var tween = null;
            switch (panel.effectType) {
                case 1:
                    tween = egret.Tween.get(panel).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, egret.Ease.backIn);
                    break;
                case 2:
                    tween = egret.Tween.get(panel).to({ y: -stageHeight }, 300, egret.Ease.backIn);
                    break;
                case 3:
                    tween = egret.Tween.get(panel).to({ y: stageHeight }, 300, egret.Ease.backIn);
                    break;
                case 4:
                    tween = egret.Tween.get(panel).to({ x: -stageWidth }, 300, egret.Ease.backIn);
                    break;
                case 5:
                    tween = egret.Tween.get(panel).to({ x: stageWidth }, 300, egret.Ease.backIn);
                    break;
                case 6:
                    egret.Tween.get(panel).set({ alpha: 1 }).to({ alpha: 0 }, 300);
                    break;
            }
            if (tween) {
                tween.call(function () {
                    DisplayUtil.removeFromParent(panel);
                }, this);
            }
            else {
                DisplayUtil.removeFromParent(panel);
            }
        };
        return GamePanel;
    }());
    HH.GamePanel = GamePanel;
    __reflect(GamePanel.prototype, "HH.GamePanel");
})(HH || (HH = {}));
//# sourceMappingURL=GamePanel.js.map