/**
 * 简单帧动画
 */
class FImage extends eui.Image {
    $eventPool: string[] = null;
    $isPlaying = false;
    $isStopped:boolean;
    $currentFrameNum = 0;
    $nextFrameNum = 1;
    $prefix = "";
    $startIndex = 0;
    $frameIntervalTime = 0;
    $playTimes = -1;
    $passedTime = 0;
    $timerId:number;

    public frameRate = -1;
    public totalFrame = 1;
    public autoPlay = true;

    public constructor() {
        super();
        this.$eventPool = [];
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number) {
        super.$onAddToStage(stage, nestLevel);
        if (this.source) {
            let source = <string>this.source;
            let index = source.search(/\d+_png/);
            this.$prefix = source.slice(0, index);
            this.$startIndex = +source.slice(index, index + 1);
        }
        if (this.frameRate) {
            this.setFrameRate(this.frameRate);
        }
        if (!this.totalFrame) {
            this.totalFrame = 1;
        }
        if (this.autoPlay && !this.$isPlaying && this.totalFrame > 1) {
            this.play();
        }
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.setIsStopped(true);
    }

    /**
     * 播放动画
     * @param times
     */
    public play(times = -1, prefix = "") {
        this.$isPlaying = true;
        if (prefix) {
            this.$prefix = prefix;
        }
        this.setPlayTimes(times);
        if (this.totalFrame > 1 && this.stage) {
            this.setIsStopped(false);
        }
    }

    public stop(frame?:number) {
        this.$isPlaying = false;
        this.setIsStopped(true);
        if (frame) {
            this.$nextFrameNum = frame;
            this.changeRes();
        }
    }

    private lastTime: number = 0;
    private advanceTime(timeStamp = 0) {
        let self = this;
        self.$passedTime += timeStamp;
        let frameIntervalTime = self.$frameIntervalTime;
        if (self.$passedTime >= frameIntervalTime) {
            self.$passedTime %= frameIntervalTime;
            self.$nextFrameNum++;
            if (self.$nextFrameNum > self.totalFrame) {
                if (self.$playTimes == -1) {
                    self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                    self.$nextFrameNum = 1;
                } else {
                    self.$playTimes--;
                    if (self.$playTimes > 0) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    } else {
                        self.$nextFrameNum = self.totalFrame;
                        self.$eventPool.push(egret.Event.COMPLETE);
                        self.stop();
                    }
                }
            }
        }
        self.handlePendingEvent();
        this.changeRes();
    }

    private handlePendingEvent(): void {
        if (this.$eventPool.length != 0) {
            this.$eventPool.reverse();
            let eventPool = this.$eventPool;
            let length = eventPool.length;
            let isComplete = false;
            let isLoopComplete = false;
            for (let i = 0; i < length; i++) {
                let event: string = eventPool.pop();
                if (event == egret.Event.LOOP_COMPLETE) {
                    isLoopComplete = true;
                } else if (event == egret.Event.COMPLETE) {
                    isComplete = true;
                } else {
                    this.dispatchEventWith(event);
                }
            }
            if (isLoopComplete) {
                this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
            }
            if (isComplete) {
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        }
    }

    public setFrameRate(value:number) {
        this.frameRate = value;
        this.$frameIntervalTime = 1000 / this.frameRate;
    }

    public get isPlaying() {
        return this.$isPlaying;
    }

    private setPlayTimes(value:number) {
        if (value < 0 || value >= 1) {
            this.$playTimes = value < 0 ? -1 : Math.floor(value);
        }
    }

    private changeRes() {
        let frame = (this.$nextFrameNum - 1 + this.$startIndex);
        this.source = this.$prefix + frame + "_png";
    }

    private setIsStopped(value:boolean) {
        if (this.$isStopped != value) {
            this.$isStopped = value;
            if (value) {
                if (this.$timerId) {
                    Game.clearTimer(this.$timerId);
                    this.$timerId = 0;
                }
            } else {
                this.$playTimes = this.$playTimes == 0 ? 1 : this.$playTimes;
                this.$timerId = Game.registerEnterFrame(this.advanceTime, this);
                this.lastTime = egret.getTimer();
            }
        }
    }
}