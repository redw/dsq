var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏中的一些循环
 * 跟egret.Timer的改进,垃圾回，做了个把柄,没有用splice处理删除.取消掉了一些不常用的功能stop,pause...
 */
var HH;
(function (HH) {
    ;
    /**
     * 游戏中的一些循环
     * -对比egret.Timer
     * -优点:更简单, 更高效
     */
    var GameLoop = (function () {
        function GameLoop(stage) {
            this.id = 1;
            this.pool = [];
            this.timerArr = [];
            this.timerMap = {};
            this.oldTimer = egret.getTimer();
            stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        GameLoop.prototype.onEnterFrame = function () {
            var curTime = egret.getTimer();
            var offTimer = curTime - this.oldTimer;
            var len = this.timerArr.length;
            for (var i = 0; i < len; i++) {
                var timer = this.timerArr[i];
                if (timer) {
                    if (!timer.back) {
                        this.release(timer);
                        this.timerArr[i] = null;
                    }
                    else {
                        if (timer.delay <= 0) {
                            timer.back.call(timer.context, offTimer);
                            if (timer.repeat == 1) {
                                this.clearTimer(timer.id);
                            }
                        }
                        else {
                            timer.time += offTimer;
                            if (timer.time > timer.delay) {
                                timer.time -= timer.delay;
                                timer.back.call(timer.context, offTimer, timer.repeat);
                                if (timer.repeat >= 1) {
                                    if (timer.repeat == 1) {
                                        this.clearTimer(timer.id);
                                    }
                                    else {
                                        timer.repeat--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.oldTimer = curTime;
        };
        GameLoop.prototype.registerEnterFrame = function (back, context) {
            return this.registerTimer(back, context, 0, 0);
        };
        GameLoop.prototype.clearTimer = function (id) {
            var timer = this.timerMap[id];
            if (timer) {
                timer.back = null;
            }
        };
        GameLoop.prototype.release = function (timer) {
            if (timer && timer.id > 0) {
                this.timerMap[timer.id] = null;
                timer.back = null;
                timer.context = null;
                timer.id = -1;
                timer.repeat = 0;
                timer.delay = 0;
                this.pool.push(timer);
            }
        };
        GameLoop.prototype.registerTimer = function (back, context, delay, repeat) {
            if (delay === void 0) { delay = 1000; }
            if (repeat === void 0) { repeat = 1; }
            if (!back) {
                console.error("registerTimer error");
                return 0;
            }
            else {
                var timer = this.pool.pop();
                if (!timer) {
                    timer = {};
                }
                timer.repeat = repeat;
                timer.delay = delay;
                timer.time = 0;
                timer.back = back;
                timer.context = context;
                var timerId = this.id++;
                timer.id = timerId;
                var index = isNaN(timer.index) ? this.timerArr.length : timer.index;
                timer.index = index;
                this.timerArr[index] = timer;
                this.timerMap[timerId] = timer;
                return timerId;
            }
        };
        return GameLoop;
    }());
    HH.GameLoop = GameLoop;
    __reflect(GameLoop.prototype, "HH.GameLoop");
})(HH || (HH = {}));
