var DisplayUtil;
(function (DisplayUtil) {
    /**
     * 创建舞台蒙板
     * @param stage
     * @param source
     * @param alpha
     * @returns {eui.Image}
     */
    function createStageMask(stage, source, alpha) {
        if (source === void 0) { source = "guide_gray_png"; }
        if (alpha === void 0) { alpha = 0.6; }
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
    DisplayUtil.createStageMask = createStageMask;
    function removeFromParent(displayObject) {
        if (displayObject && displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }
    }
    DisplayUtil.removeFromParent = removeFromParent;
    function removeAllChildren(displayObjectContainer) {
        displayObjectContainer.removeChildren();
    }
    DisplayUtil.removeAllChildren = removeAllChildren;
    function getChildByName(parent, name) {
        if (parent) {
            return parent.getChildByName(name);
        }
        else {
            return null;
        }
    }
    DisplayUtil.getChildByName = getChildByName;
    function removeChildByName(parent, name) {
        if (parent && name) {
            var child = parent.getChildByName(name);
            if (child) {
                parent.removeChild(child);
            }
        }
    }
    DisplayUtil.removeChildByName = removeChildByName;
})(DisplayUtil || (DisplayUtil = {}));
//# sourceMappingURL=DisplayUtil.js.map