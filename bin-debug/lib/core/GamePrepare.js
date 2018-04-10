var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HH;
(function (HH) {
    var GamePrepare = (function () {
        function GamePrepare(stage, eventDispatcher, options) {
            this.preloadResOk = true;
            this.jsonOk = true;
            this.defaultResOk = false;
            this.dataOk = true;
            this.postResOk = true;
            this.skinOk = !true;
            this.progress = 0;
            this.remainWidth = 100;
            this.weightObj = {
                "default_res": 10,
                "json": 0,
                "preLoad": 90,
                "data": 0,
                "postLoad": 0,
            };
            this.stage = stage;
            this.options = options;
            this.eventDispatcher = eventDispatcher;
        }
        GamePrepare.prototype.start = function (progress) {
            if (progress === void 0) { progress = 0; }
            var maxLoadingThread = Util.getPropValue(this.options, "maxLoadingThread", 2);
            RES.setMaxLoadingThread(maxLoadingThread);
            this.progress = progress;
            this.remainWidth = Math.ceil(100 - this.progress);
            this.showProgress(this.progress);
            this.loadDefaultRes();
            this.loadSkin();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onLoadError, this);
        };
        GamePrepare.prototype.showProgress = function (value, tip) {
            if (tip === void 0) { tip = ""; }
            this.eventDispatcher.dispatchEventWith("PREPARE_PROGRESS", false, { value: value, tip: tip });
        };
        GamePrepare.prototype.addProgress = function (add) {
            if (+add) {
                this.progress += add;
                this.showProgress(this.progress);
            }
        };
        // 请求服务器地址
        GamePrepare.prototype.requestServerPath = function () {
            this.sendEnterCmd();
        };
        // 加载default_res
        GamePrepare.prototype.loadDefaultRes = function () {
            var version = Const.RES_VER || Math.random();
            var resURL = "resource/default.res.json?v=" + version;
            console.time("load default.res...");
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadDefaultResComplete, this);
            RES.loadConfig(resURL, "resource/");
        };
        // 加载皮肤文件
        GamePrepare.prototype.loadSkin = function () {
            if (true) {
                var themeURL = "resource/default.thm.json";
                var theme = new eui.Theme(themeURL, Game.stage);
                theme.once(eui.UIEvent.COMPLETE, this.loadSkinComplete, this);
            }
        };
        // 加载default_res完成
        GamePrepare.prototype.loadDefaultResComplete = function (e) {
            this.eventDispatcher.dispatchEventWith("PREPARE_DEFAULT_RES_COMPLETE");
            console.timeEnd("load default.res...");
            this.defaultResOk = true;
            this.addProgress(~~(this.remainWidth * this.weightObj.default_res / 100));
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadDefaultResComplete, this);
            var target = e.target;
            if (target && target.resConfig && target.resConfig.keyMap) {
                this.loadJSON();
                this.loadPreloadRes();
            }
            else {
                egret.warn("获取到资源配置信息");
            }
        };
        GamePrepare.prototype.loadPreloadRes = function () {
            console.time("load preload_res...");
            RES.loadGroup("preload");
        };
        GamePrepare.prototype.loadPreloadResComplete = function () {
            console.timeEnd("load preload_res...");
            this.preloadResOk = true;
        };
        GamePrepare.prototype.loadPostRes = function (key) {
            console.time("load post_res...");
        };
        GamePrepare.prototype.loadPostResComplete = function () {
            console.timeEnd("load post_res...");
            this.postResOk = true;
        };
        // 加载post_res
        GamePrepare.prototype.loadPostEnterRes = function () {
            egret.log("start load poseEnter_res");
            this.loadPostEnterComplete();
        };
        // 加载post_res完成
        GamePrepare.prototype.loadPostEnterComplete = function () {
            egret.log("load poseEnter_res complete");
        };
        // 加载玩家数据
        GamePrepare.prototype.sendEnterCmd = function () {
            egret.log("start load enter_data");
            this.onDataRes(null);
        };
        // 加载数据完成
        GamePrepare.prototype.onDataRes = function (data) {
            egret.log("load enter_data complete");
            this.addProgress(~~(this.remainWidth * this.weightObj.data / 100));
            this.dataOk = true;
            this.checkEnterGame();
        };
        // 加载配置文件包
        GamePrepare.prototype.loadJSON = function () {
            var version = (+Const.JSON_VER || Math.random());
            console.time("load json_config...");
            this.loadJSONComplete(null);
        };
        // 加载配置表完成
        GamePrepare.prototype.loadJSONComplete = function (data) {
            console.timeEnd("load json_config...");
            this.addProgress(~~(this.remainWidth * this.weightObj.json / 100));
            this.jsonOk = true;
            this.eventDispatcher.dispatchEventWith("PREPARE_CONFIG_COMPLETE");
            this.checkEnterGame();
        };
        // 加载皮肤完成
        GamePrepare.prototype.loadSkinComplete = function () {
            console.timeEnd("load skin_res...");
            this.skinOk = true;
            this.checkEnterGame();
        };
        GamePrepare.prototype.onLoadGroupComplete = function (e) {
            var groupName = e.groupName;
            if (groupName == "preload") {
                this.loadPreloadResComplete();
            }
            if (groupName == "postEnter") {
                this.loadPostResComplete();
            }
        };
        GamePrepare.prototype.onLoadGroupProgress = function (e) {
            var groupName = e.groupName;
            if (groupName == "preload") {
                this.addProgress((this.remainWidth * this.weightObj.preLoad * 1 / e.itemsTotal / 100));
            }
            else if (groupName == "postEnter") {
                this.addProgress((this.remainWidth * this.weightObj.postLoad * 1 / e.itemsTotal / 100));
            }
        };
        GamePrepare.prototype.onLoadError = function (e) {
            egret.log(e.groupName + ":" + e.itemsLoaded + "/" + e.itemsTotal);
        };
        // 检测是否能进入游戏
        GamePrepare.prototype.checkEnterGame = function () {
            if (this.preloadResOk && this.jsonOk && this.skinOk) {
                this.enterGame();
            }
        };
        GamePrepare.prototype.enterGame = function () {
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
        };
        return GamePrepare;
    }());
    HH.GamePrepare = GamePrepare;
    __reflect(GamePrepare.prototype, "HH.GamePrepare");
})(HH || (HH = {}));
var GameEvent = (function () {
    function GameEvent() {
    }
    GameEvent.PREPARE_PROGRESS = "PREPARE_PROGRESS";
    GameEvent.PREPARE_COMPLETE = "PREPARE_COMPLETE";
    return GameEvent;
}());
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GamePrepare.js.map