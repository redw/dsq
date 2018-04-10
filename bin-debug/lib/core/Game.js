var Game;
(function (Game) {
    var eventDispatcher;
    function init($stage, options) {
        console.log(' _       _');
        console.log('| |__   | |__');
        console.log('|  _ \\  |  _ \\');
        console.log('| | | | | | | |');
        console.log('|_| |_| |_| |_|');
        console.log('我是hh, 18964689079');
        console.log('专业专注小游戏,小程序');
        console.log('用最好的产品回报给大家!');
        Game.stage = $stage;
        if ("dirtyRegionPolicy" in Game.stage) {
            Game.stage["dirtyRegionPolicy"] = "off";
        }
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        eventDispatcher = new egret.EventDispatcher();
        Game.loop = new HH.GameLoop(Game.stage);
        Game.pop = new HH.GamePanel(Game.stage);
        Game.sound = new HH.GameSound(Game.stage);
        Game.http = new HH.GameHttp(eventDispatcher, options);
        Game.socket = new HH.GameSocket(eventDispatcher, options);
        Game.prepare = new HH.GamePrepare(Game.stage, eventDispatcher, options);
        Game.load = new HH.GameLoad(options);
    }
    Game.init = init;
    /**
     * 开始prepare
     *
     * @param progress
     */
    function start(progress) {
        if (progress === void 0) { progress = 0; }
        Game.prepare.start(progress);
    }
    Game.start = start;
    function setToken(token) {
        if (token) {
            Game.http.setToken(token);
        }
    }
    Game.setToken = setToken;
    function setSocketToken(token) {
        if (token) {
            Game.socket.setToken(token);
        }
    }
    Game.setSocketToken = setSocketToken;
    /**
     * 发送get请求
     */
    function get(cmd, body, cbObj) {
        Game.http.get(cmd, body, cbObj);
    }
    Game.get = get;
    /**
     * 发送post请求
     */
    function post(cmd, body, cbObj) {
        Game.http.post(cmd, body, cbObj);
    }
    Game.post = post;
    /**
     * 发送socket请求
     * @param body
     */
    function syncMsg(body) {
        Game.socket.sendMessage(body);
    }
    Game.syncMsg = syncMsg;
    /**
     * 关闭界面
     * @param panel
     */
    function closePanel(panel) {
        Game.pop.close(panel);
    }
    Game.closePanel = closePanel;
    /**
     * 打开界面
     * @param panel
     */
    function openPanel(panel, data) {
        return Game.pop.open(panel, data);
    }
    Game.openPanel = openPanel;
    /**
     * 面板是否是打开的
     *
     * @param panel
     * @returns {boolean}
     */
    function isPanelShow(panel) {
        return Game.pop.isShow(panel);
    }
    Game.isPanelShow = isPanelShow;
    /**
     * 得到面板实例
     *
     * @param panel
     * @returns {any}
     */
    function getPanel(panel) {
        return Game.pop.getPanelByName(panel);
    }
    Game.getPanel = getPanel;
    function topPanel(panel) {
        return Game.pop.topPanel(panel);
    }
    Game.topPanel = topPanel;
    /**
     * 播放音乐
     * @param url
     * @param loop
     */
    function playMusic(url) {
        if (Game.sound) {
            Game.sound.playMusic(url);
        }
    }
    Game.playMusic = playMusic;
    /**
     * 播放音效
     * @param url
     */
    function playSound(url) {
        if (Game.sound) {
            Game.sound.playSound(url);
        }
    }
    Game.playSound = playSound;
    /**
     * 开关音乐
     * @param value
     */
    function setMusicState(value) {
        Game.sound.musicState = value;
    }
    Game.setMusicState = setMusicState;
    function getMusicState() {
        return Game.sound.musicState;
    }
    Game.getMusicState = getMusicState;
    /**
     * 开关音效
     * @param value
     */
    function setSoundState(value) {
        Game.sound.soundState = value;
    }
    Game.setSoundState = setSoundState;
    function getSoundState() {
        return Game.sound.soundState;
    }
    Game.getSoundState = getSoundState;
    /**
     * 注册秒事件
     * @param fun
     * @param scope
     * @returns {number|number}
     */
    function registerSecond(fun, scope) {
        return Game.registerTimer(fun, scope, 1000, 0);
    }
    Game.registerSecond = registerSecond;
    /**
     * 注册enterFrame事件
     * @param fun
     * @param scope
     * @returns {number|number}
     */
    function registerEnterFrame(fun, scope) {
        return Game.loop.registerEnterFrame(fun, scope);
    }
    Game.registerEnterFrame = registerEnterFrame;
    function registerTimer(fun, scope, delay, repeat) {
        return Game.loop.registerTimer(fun, scope, delay, repeat);
    }
    Game.registerTimer = registerTimer;
    function delayCall(fun, scope) {
        Game.loop.registerTimer(fun, scope, 0);
    }
    Game.delayCall = delayCall;
    /**
     * 关闭计时器
     * @param id
     */
    function clearTimer(id) {
        Game.loop.clearTimer(id);
    }
    Game.clearTimer = clearTimer;
    /**
     * 派发事件
     * @param type
     * @param data
     */
    function emit(type, data) {
        eventDispatcher.dispatchEventWith(type, false, data);
    }
    Game.emit = emit;
    /**
     * 监听事件
     * @param type
     * @param cb
     * @param cbObj
     */
    function on(type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        var list = typeof type == "string" ? [type] : type;
        for (var i = 0; i < list.length; i++) {
            var t = list[i];
            eventDispatcher.addEventListener(t, callback, scope, false, priority);
        }
    }
    Game.on = on;
    /**
     * 删除事件
     * @param type
     * @param cb
     * @param cbObj
     */
    function off(type, callback, scope) {
        var list = typeof type == "string" ? [type] : type;
        for (var i = 0; i < list.length; i++) {
            var t = list[i];
            eventDispatcher.removeEventListener(t, callback, scope);
        }
    }
    Game.off = off;
    /**
     * 是否有事件监听
     * @param type
     * @returns {boolean}
     */
    function hasEventListener(type) {
        return eventDispatcher.hasEventListener(type);
    }
    Game.hasEventListener = hasEventListener;
    /**
     * 加载资源
     *
     * @param keys
     * @param callback
     * @param scope
     */
    function loadResList(keys, callback, scope) {
        Game.load.loadGroup(keys, callback, scope);
    }
    Game.loadResList = loadResList;
    /**
     * 同步创建龙骨文件
     * @returns {T|any|null|Armature|null}
     */
    function createArmatureSync() {
        return BoneUtil.createArmatureSync(name);
    }
    Game.createArmatureSync = createArmatureSync;
    function createArmature(name, cb, scope) {
        BoneUtil.createArmature(name, cb, scope);
    }
    Game.createArmature = createArmature;
    function releaseArmature(armature) {
        BoneUtil.release(armature);
    }
    Game.releaseArmature = releaseArmature;
})(Game || (Game = {}));
