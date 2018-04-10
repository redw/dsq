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
var ExBone = (function (_super) {
    __extends(ExBone, _super);
    function ExBone(boneName) {
        var _this = _super.call(this) || this;
        _this.minWidth = 10;
        _this.minHeight = 10;
        // 当前动作
        _this.aniName = "";
        // 循环动作
        _this.loopAniName = "";
        // 自动播放
        _this.auto = true;
        _this.boneName = boneName;
        return _this;
    }
    ExBone.prototype.childrenCreated = function () {
        this.initLoopAniName = this.loopAniName;
        this.initAniName = this.aniName || this.loopAniName;
        if (this.auto) {
            this.conditionPlay();
        }
    };
    ExBone.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
    };
    ExBone.prototype.play = function (animationName, playTimes) {
        if (playTimes === void 0) { playTimes = 1; }
        if (animationName) {
            if (playTimes <= 0) {
                playTimes = 0;
                this.loopAniName = animationName;
            }
            if (this.aniName != animationName) {
                this.aniName = animationName;
            }
            if (this.armature) {
                this.armature.removeEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
                this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onFrameComplete, this);
                this.armature.addEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
                this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onFrameComplete, this);
                var names = this.armature.animation.animationNames;
                if (names.indexOf(animationName) >= 0) {
                    this.armature.animation.play(animationName, playTimes);
                }
            }
        }
    };
    ExBone.prototype.onFrameEvent = function (e) {
        var frameLabel = e.frameLabel;
        this.dispatchEventWith("frame_event", true, frameLabel);
    };
    ExBone.prototype.onFrameComplete = function (e) {
        this.dispatchEventWith("frame_complete", true, e.target.name);
        this.aniName = null;
        this.conditionPlay();
    };
    Object.defineProperty(ExBone.prototype, "source", {
        /**
         * 骨格别名
         * @param value
         */
        set: function (value) {
            this.boneName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExBone.prototype, "boneName", {
        get: function () {
            return this._boneName;
        },
        set: function (value) {
            if (value != this._boneName) {
                this._boneName = value;
                BoneUtil.release(this.armature);
                this.armature = null;
                if (value) {
                    this.aniName = this.initAniName;
                    this.loopAniName = this.initLoopAniName;
                    BoneUtil.createArmature(value, this.addBone, this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ExBone.prototype.addBone = function (armature) {
        if (armature.name == this._boneName) {
            this.armature = armature;
            this.addChildAt(armature.display, 0);
            if (this.auto) {
                this.conditionPlay();
            }
        }
    };
    ExBone.prototype.conditionPlay = function () {
        if (this.aniName) {
            if (this.aniName != this.loopAniName) {
                this.play(this.aniName);
            }
            else {
                if (this.loopAniName) {
                    this.play(this.loopAniName, 0);
                }
            }
        }
        else {
            if (this.loopAniName) {
                this.play(this.loopAniName, 0);
            }
        }
    };
    ExBone.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
    };
    ExBone.prototype.replaceTexture = function (key) {
        // 换装
        this.armature.replaceTexture(RES.getRes(key));
    };
    ExBone.prototype.dispose = function () {
        if (this.armature) {
            this.armature.removeEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
            this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onFrameComplete, this);
            this._boneName = null;
            BoneUtil.release(this.armature);
            this.armature = null;
        }
        DisplayUtil.removeFromParent(this);
    };
    return ExBone;
}(eui.Component));
__reflect(ExBone.prototype, "ExBone");
//# sourceMappingURL=ExBone.js.map