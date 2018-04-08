/**
 * 游戏中的一些循环
 * 跟egret.Timer的改进,垃圾回，做了个把柄,没有用splice处理删除.取消掉了一些不常用的功能stop,pause...
 */
module HH {
    interface Timer {
        id:number,
        back:Function,
        context:any,
        repeat:number,
        delay:number,
        time:number,
        index:number
    };

    /**
     * 游戏中的一些循环
     * -对比egret.Timer
     * -优点:更简单, 更高效
     */
    export class GameLoop {
        private id = 1;
        private oldTimer;
        private timerMap;
        private pool:Timer[];
        private timerArr:Timer[];

        public constructor(stage:egret.Stage) {
            this.pool = [];
            this.timerArr = [];
            this.timerMap = {};
            this.oldTimer = egret.getTimer();
            stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        }

        private onEnterFrame() {
            let curTime = egret.getTimer();
            let offTimer = curTime - this.oldTimer;
            let len = this.timerArr.length;
            for (let i = 0; i < len; i++) {
                let timer = this.timerArr[i];
                if (timer) {
                    if (!timer.back) {
                        this.release(timer);
                        this.timerArr[i] = null;
                    } else {
                        if (timer.delay <= 0) {
                            timer.back.call(timer.context, offTimer);
                            if (timer.repeat == 1) {
                                this.clearTimer(timer.id);
                            }
                        } else {
                            timer.time += offTimer;
                            if (timer.time > timer.delay) {
                                timer.time -= timer.delay;
                                timer.back.call(timer.context, offTimer, timer.repeat);
                                if (timer.repeat >= 1) {
                                    if (timer.repeat == 1) {
                                        this.clearTimer(timer.id);
                                    } else {
                                        timer.repeat--;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.oldTimer = curTime;
        }

        public registerEnterFrame(back:Function, context?:any) {
            return this.registerTimer(back, context, 0, 0);
        }

        public clearTimer(id:number) {
            let timer = this.timerMap[id];
            if (timer) {
                timer.back = null;
            }
        }

        private release(timer:Timer) {
            if (timer && timer.id > 0) {
                this.timerMap[timer.id] = null;
                timer.back = null;
                timer.context = null;
                timer.id = -1;
                timer.repeat = 0;
                timer.delay = 0;
                this.pool.push(timer);
            }
        }

        public registerTimer(back:Function, context?:any, delay = 1000, repeat = 1) {
            if (!back) {
                console.error("registerTimer error");
                return 0;
            } else {
                let timer = this.pool.pop();
                if (!timer) {
                    timer = <Timer>{};
                }
                timer.repeat = repeat;
                timer.delay = delay;
                timer.time = 0;
                timer.back = back;
                timer.context = context;
                let timerId = this.id++;
                timer.id = timerId;
                let index = isNaN(timer.index) ? this.timerArr.length : timer.index;
                timer.index = index;
                this.timerArr[index] = timer;
                this.timerMap[timerId] = timer;
                return timerId;
            }
        }
    }
}

