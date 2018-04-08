module HH {
    export class GamePrepare{
        private preloadResOk = true;
        private jsonOk = true;
        private defaultResOk = false;
        private dataOk = true;
        private postResOk = true;
        private skinOk = !DEBUG;

        private progress = 0;
        private remainWidth = 100;

        private stage:egret.Stage;
        private options:any;
        private eventDispatcher:egret.EventDispatcher;

        private weightObj = {
            "default_res": 10,
            "json": 0,
            "preLoad": 90,
            "data": 0,
            "postLoad": 0,
        };

        public constructor(stage:egret.Stage, eventDispatcher:egret.EventDispatcher,  options?:any) {
            this.stage = stage;
            this.options = options;
            this.eventDispatcher = eventDispatcher;
        }

        public start(progress = 0) {
            let maxLoadingThread = Util.getPropValue(this.options, "maxLoadingThread", 2);
            RES.setMaxLoadingThread(maxLoadingThread);

            this.progress = progress;
            this.remainWidth = Math.ceil(100 - this.progress);
            this.showProgress(this.progress);
            this.loadDefaultRes();
            this.loadSkin();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onLoadError, this);
        }

        private showProgress(value:number, tip = "") {
            this.eventDispatcher.dispatchEventWith("PREPARE_PROGRESS", false, {value:value, tip:tip});
        }

        private addProgress(add:number) {
            if (+add) {
                this.progress += add;
                this.showProgress(this.progress);
            }
        }

        // 请求服务器地址
        private requestServerPath() {
            this.sendEnterCmd();
        }

        // 加载default_res
        private loadDefaultRes() {
            let version = Const.RES_VER || Math.random();
            let resURL = `resource/default.res.json?v=${version}`;
            console.time("load default.res...");
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadDefaultResComplete, this);
            RES.loadConfig(resURL, "resource/")
        }

        // 加载皮肤文件
        private loadSkin() {
            if (DEBUG) {
                let themeURL = "resource/default.thm.json";
                let theme = new eui.Theme(themeURL, Game.stage);
                theme.once(eui.UIEvent.COMPLETE, this.loadSkinComplete, this);
            }
        }

        // 加载default_res完成
        private loadDefaultResComplete(e:RES.ResourceEvent) {
            this.eventDispatcher.dispatchEventWith("PREPARE_DEFAULT_RES_COMPLETE");
            console.timeEnd("load default.res...");
            this.defaultResOk = true;
            this.addProgress(~~(this.remainWidth * this.weightObj.default_res / 100));
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadDefaultResComplete, this);
            let target = e.target;
            if (target && target.resConfig && target.resConfig.keyMap) {
                this.loadJSON();
                this.loadPreloadRes();
            } else {
                egret.warn("获取到资源配置信息");
            }
        }

        private loadPreloadRes() {
            console.time("load preload_res...");
            RES.loadGroup("preload");
        }

        private loadPreloadResComplete() {
            console.timeEnd("load preload_res...");
            this.preloadResOk = true;
        }

        public loadPostRes(key:string[]) {
            console.time("load post_res...");
        }

        private loadPostResComplete() {
            console.timeEnd("load post_res...");
            this.postResOk = true;
        }

        // 加载post_res
        private loadPostEnterRes() {
            egret.log("start load poseEnter_res");
            this.loadPostEnterComplete();
        }

        // 加载post_res完成
        private loadPostEnterComplete() {
            egret.log("load poseEnter_res complete");
        }

        // 加载玩家数据
        private sendEnterCmd() {
            egret.log("start load enter_data");
            this.onDataRes(null);
        }

        // 加载数据完成
        public onDataRes(data:any) {
            egret.log("load enter_data complete");
            this.addProgress(~~(this.remainWidth * this.weightObj.data / 100));
            this.dataOk = true;
            this.checkEnterGame();
        }

        // 加载配置文件包
        private loadJSON() {
            let version = (+Const.JSON_VER || Math.random());
            console.time("load json_config...");
            this.loadJSONComplete(null);
        }

        // 加载配置表完成
        private loadJSONComplete(data:any) {
            console.timeEnd("load json_config...");
            this.addProgress(~~(this.remainWidth * this.weightObj.json / 100));
            this.jsonOk = true;
            this.eventDispatcher.dispatchEventWith("PREPARE_CONFIG_COMPLETE");
            this.checkEnterGame();
        }

        // 加载皮肤完成
        private loadSkinComplete() {
            console.timeEnd("load skin_res...");
            this.skinOk = true;
            this.checkEnterGame();
        }

        private onLoadGroupComplete(e:RES.ResourceEvent) {
            let groupName = e.groupName;
            if (groupName == "preload") {
                this.loadPreloadResComplete();
            }
            if (groupName == "postEnter") {
                this.loadPostResComplete();
            }
        }

        private onLoadGroupProgress(e:RES.ResourceEvent) {
            let groupName = e.groupName;
            if (groupName == "preload") {
                this.addProgress((this.remainWidth * this.weightObj.preLoad * 1 / e.itemsTotal / 100));
            } else if (groupName == "postEnter") {
                this.addProgress((this.remainWidth * this.weightObj.postLoad * 1 / e.itemsTotal / 100));
            }
        }

        private onLoadError(e:RES.ResourceEvent) {
            egret.log(e.groupName + ":" + e.itemsLoaded + "/" + e.itemsTotal);
        }

        // 检测是否能进入游戏
        private checkEnterGame() {
            if (this.preloadResOk && this.jsonOk && this.skinOk) {
                this.enterGame();
            }
        }

        private enterGame() {
            this.dataOk = false;
            this.preloadResOk = false;
            this.jsonOk = false;
            this.postResOk = false;
            this.showProgress(100, "马上进入游戏");
            this.weightObj = null;
            egret.Tween.removeAllTweens();
            this.eventDispatcher.dispatchEventWith("PREPARE_COMPLETE");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onLoadError, this);
        }
    }
}

class GameEvent {
    public static PREPARE_PROGRESS = "PREPARE_PROGRESS";
    public static PREPARE_COMPLETE = "PREPARE_COMPLETE";
}
