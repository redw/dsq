module DisplayUtil {
    /**
     * 创建舞台蒙板
     * @param stage
     * @param source
     * @param alpha
     * @returns {eui.Image}
     */
    export function createStageMask(stage:egret.Stage, source="guide_gray_png", alpha = 0.6) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x0, alpha);
        shape.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        shape.touchEnabled = true;
        shape.graphics.endFill();
        // var model:eui.Image = new eui.Image();
        // model.source = source;
        // model.x = 0;
        // model.y = 0;
        // model.alpha = alpha;
        // model.width = stage.stageWidth;
        // model.height = stage.stageHeight;
        // model.touchEnabled = true;
        return shape;
    }

    export function removeFromParent(displayObject:egret.DisplayObject):void {
        if (displayObject && displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }
    }

    export function removeAllChildren(displayObjectContainer:egret.DisplayObjectContainer):void {
        displayObjectContainer.removeChildren();
    }

    export function getChildByName(parent:egret.DisplayObjectContainer, name:string):egret.DisplayObject {
        if (parent) {
            return parent.getChildByName(name);
        } else {
            return null;
        }
    }

    export function removeChildByName(parent:egret.DisplayObjectContainer, name:string) {
        if (parent && name) {
            let child = parent.getChildByName(name);
            if (child) {
                parent.removeChild(child);
            }
        }
    }
}