module HH {
    export class GamePanel{
        private _layerMap = null;
        private _panelMap = null;
        private stage:egret.Stage;

        public constructor(stage:egret.Stage) {
            this.stage = stage;
            this._layerMap = {};
            this._panelMap = {};

            let list = [PanelLayer.BOTTOM_LAYER, PanelLayer.TOP_LAYER, PanelLayer.ALERT_LAYER];
            for (let i = 0, len = list.length; i < len; i++) {
                let name = list[i];
                let layer = new eui.Group();
                layer.name = name;
                layer.width = stage.stageWidth;
                layer.height = stage.stageHeight;
                layer.touchEnabled = false;
                layer.touchChildren = true;
                stage.addChild(layer);
                this._layerMap[name] = layer;
            }
        }

        public getLayer(name:string):eui.Group {
            return this._layerMap[name];
        }

        public closeLayer(name:string) {
            let group = this.getLayer(name);
            while (group.numChildren) {
                let panel = group.getChildAt(group.numElements - 1);
                if (panel instanceof eui.Image) {
                    DisplayUtil.removeFromParent(panel);
                } else {
                    this.hidePanel(panel);
                }
            }
        }

        public getPanelByName(name:any) {
            name = this.getPanelName(name);
            return this._panelMap[name];
        }

        public topPanel(panel:BasePanel) {
            if (panel) {
                let layer = <egret.DisplayObjectContainer>this._layerMap[panel.layer];
                let modalName = panel.name + "_modal";
                layer.setChildIndex(panel, layer.numChildren - 1);
                if (layer.getChildByName(modalName)) {
                    layer.setChildIndex(panel, layer.numChildren - 1);
                }
            }
        }

        public isShow(name:any) {
            let panelName = this.getPanelName(name);
            let panel = this._panelMap[panelName];
            return panel && panel.visible && panel.stage;
        }

        public getPanelList(layer?:string) {
            let list: BasePanel[] = [];
            for (let key in this._panelMap) {
                let panel: BasePanel = this._panelMap[key];
                if (panel && panel.layer == layer || !layer) {
                    list.push(panel);
                }
            }
            return list;
        }

        private addModel(panel:BasePanel) {
            let layer: eui.Group = this._layerMap[panel.layer];
            if (panel.modal) {
                let modal = DisplayUtil.createStageMask(this.stage);
                modal.name = panel.name + "_modal";
                layer.addChild(modal);
            }
        }

        public showPanel(name:any, data?:any) {
            name = this.getPanelName(name);
            let cls = egret.getDefinitionByName(name);
            let panel:BasePanel = this._panelMap[name];
            if (!panel) {
                panel = new cls();
                panel.name = name;
                this._panelMap[panel.name] = panel;
            }
            if (panel) {
                console.log(`[ShowPanel] ${name}`);
                if (!panel.parent) {
                    this.addModel(panel);
                    let layerName = panel.layer || PanelLayer.TOP_LAYER;
                    let layer: eui.Group = this._layerMap[layerName];
                    layer.addChild(panel);
                    this.addOpenEffect(panel);
                }
                panel.setData(data);
                this.stage.dispatchEventWith("panel_opened", name);
            } else {
                console.warn(`[ShowPanel] ${name} error`);
            }
            return panel;
        }

        public open(name:any, data?:any) {
            return this.showPanel(name, data);
         }

        public hidePanel(name:any) {
            name = this.getPanelName(name);
            let panel:BasePanel = this._panelMap[name];
            if (panel) {
                console.log("[HidePanel] <<< ", name);
                egret.Tween.removeTweens(panel);
                if (panel.parent) {
                    let layer: eui.Group = this._layerMap[panel.layer];
                    if (panel.modal) {
                        DisplayUtil.removeChildByName(layer, panel.name + "_modal");
                    }
                    panel.sleep();
                    this.addCloseEffect(panel);
                }
                let autoDispose = panel.autoDispose;
                if (autoDispose) {
                    panel.removeFromStage();
                    panel.dispose();
                    delete this._panelMap[name];
                }
            } else {
                console.warn(`[HidePanel] ${name} 已经关闭了`);
            }
            this.stage.dispatchEventWith("panel_closed", name);
        }

        public close(name:any) {
            this.hidePanel(name);
        }

        private getPanelName(panel:any) {
            let name = "";
            let t = typeof panel;
            if (t == "string") {
                name = <string>panel;
            } else if (panel instanceof eui.Component) {
                name = panel.name;
            } else if (panel instanceof Function) {
                name = egret.getQualifiedClassName(panel);
            }
            return name;
        }

        private addOpenEffect(panel:BasePanel) {
            egret.Tween.removeTweens(panel);
            let stageWidth = this.stage.stageWidth;
            let stageHeight = this.stage.stageHeight;
            let panelWidth = panel.width;
            let panelHeight = panel.height;
            let initScaleX = panel["preScaleX"] || 1;
            let initScaleY = panel["preScaleY"] || 1;
            switch (panel.effectType) {
                case 1:
                    panel.anchorOffsetX = panel.width / 2;
                    panel.anchorOffsetY = panel.height / 2;
                    panel.x = stageWidth / 2;
                    panel.y = stageHeight / 2;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.alpha = 0;
                    egret.Tween.get(panel).to({scaleX:initScaleX, scaleY:initScaleY, alpha:1}, 300, egret.Ease.backOut);
                    break;

                case 2:
                    panel.y = -stageHeight;
                    egret.Tween.get(panel).to({y:(stageHeight - panelHeight) * 0.5}, 300, egret.Ease.backOut);
                    break;

                case 3:
                    panel.y = stageHeight;
                    egret.Tween.get(panel).to({y:(stageHeight - panelHeight) * 0.5}, 300, egret.Ease.backOut);
                    break;

                case 4:
                    panel.x = -stageWidth;
                    egret.Tween.get(panel).to({x:(stageWidth - panelWidth) * 0.5}, 300, egret.Ease.backOut);
                    break;

                case 5:
                    panel.x = stageWidth;
                    egret.Tween.get(panel).to({x:(stageWidth - panelWidth) * 0.5}, 300, egret.Ease.backOut);
                    break;
                case 6:
                    egret.Tween.get(panel).set({alpha: 0}).to({alpha:1}, 300);
                    break;
            }
        }

        private addCloseEffect(panel:BasePanel) {
            egret.Tween.removeTweens(panel);
            let stageWidth = this.stage.stageWidth;
            let stageHeight = this.stage.stageHeight;
            let tween = null;
            switch (panel.effectType) {
                case 1:
                    tween = egret.Tween.get(panel).to({scaleX:0.5, scaleY:0.5, alpha:0}, 300, egret.Ease.backIn);
                    break;

                case 2:
                    tween = egret.Tween.get(panel).to({y:-stageHeight}, 300, egret.Ease.backIn);
                    break;

                case 3:
                    tween = egret.Tween.get(panel).to({y:stageHeight}, 300, egret.Ease.backIn);
                    break;

                case 4:
                    tween = egret.Tween.get(panel).to({x:-stageWidth }, 300, egret.Ease.backIn);
                    break;

                case 5:
                    tween = egret.Tween.get(panel).to({x:stageWidth}, 300, egret.Ease.backIn);
                    break;

                case 6:
                    egret.Tween.get(panel).set({alpha:1}).to({alpha:0}, 300);
                    break;
            }
            if (tween) {
                tween.call(() => {
                    DisplayUtil.removeFromParent(panel);
                }, this)
            } else {
                DisplayUtil.removeFromParent(panel);
            }
        }
    }
}