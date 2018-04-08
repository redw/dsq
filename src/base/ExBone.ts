class ExBone extends eui.Component {
    public minWidth = 10;
    public minHeight = 10;

    // 骨格名
    private _boneName:string;
    // 当前动作
    public aniName = "";
    // 循环动作
    public loopAniName = "";
    // 自动播放
    public auto = true;

    private initAniName;
    private initLoopAniName;
    private armature:dragonBones.Armature;

    public constructor(boneName?:string) {
        super();
        this.boneName = boneName;
    }

    public childrenCreated() {
        this.initLoopAniName = this.loopAniName;
        this.initAniName = this.aniName || this.loopAniName;
        if (this.auto) {
            this.conditionPlay();
        }
    }

    $onAddToStage(stage:egret.Stage, nestLevel:number) {
        super.$onAddToStage(stage, nestLevel);
    }

    public play(animationName:string, playTimes = 1) {
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
                let names = this.armature.animation.animationNames;
                if (names.indexOf(animationName) >= 0) {
                    this.armature.animation.play(animationName, playTimes);
                }
            }
        }
    }

    private onFrameEvent(e:dragonBones.AnimationEvent) {
        let frameLabel = e.frameLabel;
        this.dispatchEventWith("frame_event", true, frameLabel);
    }

    private onFrameComplete(e:dragonBones.AnimationEvent) {
        this.dispatchEventWith("frame_complete", true, e.target.name);
        this.aniName = null;
        this.conditionPlay();
    }

    /**
     * 骨格别名
     * @param value
     */
    public set source(value:string) {
        this.boneName = value;
    }

    public get boneName() {
        return this._boneName;
    }

    public set boneName(value:string) {
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
    }

    private addBone(armature:dragonBones.Armature) {
        if (armature.name == this._boneName) {
            this.armature = armature;
            this.addChildAt(armature.display, 0);
            if (this.auto) {
                this.conditionPlay();
            }
        }
    }

    private conditionPlay() {
        if (this.aniName) {
            if (this.aniName != this.loopAniName) {
                this.play(this.aniName);
            } else {
                if (this.loopAniName) {
                    this.play(this.loopAniName, 0);
                }
            }
        } else {
            if (this.loopAniName) {
                this.play(this.loopAniName, 0);
            }
        }
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
    }

    public replaceTexture(key:string) {
        // 换装
        this.armature.replaceTexture(RES.getRes(key))
    }

    public dispose() {
        if (this.armature) {
            this.armature.removeEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
            this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onFrameComplete, this);
            this._boneName = null;
            BoneUtil.release(this.armature);
            this.armature = null;
        }
        DisplayUtil.removeFromParent(this);
    }
}