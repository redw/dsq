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
/**
 * 简单帧动画
 */
var FImage = (function (_super) {
    __extends(FImage, _super);
    function FImage() {
        var _this = _super.call(this) || this;
        _this.$eventPool = null;
        _this.$isPlaying = false;
        _this.$currentFrameNum = 0;
        _this.$nextFrameNum = 1;
        _this.$prefix = "";
        _this.$startIndex = 0;
        _this.$frameIntervalTime = 0;
        _this.$playTimes = -1;
        _this.$passedTime = 0;
        _this.frameRate = -1;
        _this.totalFrame = 1;
        _this.autoPlay = true;
        _this.lastTime = 0;
        _this.$eventPool = [];
        return _this;
    }
    FImage.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        if (this.source) {
            var source = this.source;
            var index = source.search(/\d+_png/);
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
    };
    FImage.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.setIsStopped(true);
    };
    /**
     * 播放动画
     * @param times
     */
    FImage.prototype.play = function (times, prefix) {
        if (times === void 0) { times = -1; }
        if (prefix === void 0) { prefix = ""; }
        this.$isPlaying = true;
        if (prefix) {
            this.$prefix = prefix;
        }
        this.setPlayTimes(times);
        if (this.totalFrame > 1 && this.stage) {
            this.setIsStopped(false);
        }
    };
    FImage.prototype.stop = function (frame) {
        this.$isPlaying = false;
        this.setIsStopped(true);
        if (frame) {
            this.$nextFrameNum = frame;
            this.changeRes();
        }
    };
    FImage.prototype.advanceTime = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = 0; }
        var self = this;
        self.$passedTime += timeStamp;
        var frameIntervalTime = self.$frameIntervalTime;
        if (self.$passedTime >= frameIntervalTime) {
            self.$passedTime %= frameIntervalTime;
            self.$nextFrameNum++;
            if (self.$nextFrameNum > self.totalFrame) {
                if (self.$playTimes == -1) {
                    self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                    self.$nextFrameNum = 1;
                }
                else {
                    self.$playTimes--;
                    if (self.$playTimes > 0) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    }
                    else {
                        self.$nextFrameNum = self.totalFrame;
                        self.$eventPool.push(egret.Event.COMPLETE);
                        self.stop();
                    }
                }
            }
        }
        self.handlePendingEvent();
        this.changeRes();
    };
    FImage.prototype.handlePendingEvent = function () {
        if (this.$eventPool.length != 0) {
            this.$eventPool.reverse();
            var eventPool = this.$eventPool;
            var length_1 = eventPool.length;
            var isComplete = false;
            var isLoopComplete = false;
            for (var i = 0; i < length_1; i++) {
                var event_1 = eventPool.pop();
                if (event_1 == egret.Event.LOOP_COMPLETE) {
                    isLoopComplete = true;
                }
                else if (event_1 == egret.Event.COMPLETE) {
                    isComplete = true;
                }
                else {
                    this.dispatchEventWith(event_1);
                }
            }
            if (isLoopComplete) {
                this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
            }
            if (isComplete) {
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        }
    };
    FImage.prototype.setFrameRate = function (value) {
        this.frameRate = value;
        this.$frameIntervalTime = 1000 / this.frameRate;
    };
    Object.defineProperty(FImage.prototype, "isPlaying", {
        get: function () {
            return this.$isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    FImage.prototype.setPlayTimes = function (value) {
        if (value < 0 || value >= 1) {
            this.$playTimes = value < 0 ? -1 : Math.floor(value);
        }
    };
    FImage.prototype.changeRes = function () {
        var frame = (this.$nextFrameNum - 1 + this.$startIndex);
        this.source = this.$prefix + frame + "_png";
    };
    FImage.prototype.setIsStopped = function (value) {
        if (this.$isStopped != value) {
            this.$isStopped = value;
            if (value) {
                if (this.$timerId) {
                    Game.clearTimer(this.$timerId);
                    this.$timerId = 0;
                }
            }
            else {
                this.$playTimes = this.$playTimes == 0 ? 1 : this.$playTimes;
                this.$timerId = Game.registerEnterFrame(this.advanceTime, this);
                this.lastTime = egret.getTimer();
            }
        }
    };
    return FImage;
}(eui.Image));
__reflect(FImage.prototype, "FImage");
//# sourceMappingURL=FImage.js.map