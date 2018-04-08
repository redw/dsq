module Game {
    let eventDispatcher:egret.EventDispatcher;
    export let stage:egret.Stage;
    export let pop:HH.GamePanel;
    export let sound:HH.GameSound;
    export let socket:HH.GameSocket;
    export let http:HH.GameHttp;
    export let load:HH.GameLoad;
    export let loop:HH.GameLoop;
    export let prepare:HH.GamePrepare;
    
    export function init($stage:egret.Stage, options:any) {
        console.log(' _       _');
        console.log('| |__   | |__');
        console.log('|  _ \\  |  _ \\');
        console.log('| | | | | | | |');
        console.log('|_| |_| |_| |_|');
        console.log('我是hh, 18964689079');
        console.log('专业专注小游戏,小程序');
        console.log('用最好的产品回报给大家!');

        stage = $stage;
        if ("dirtyRegionPolicy" in stage) {
            stage["dirtyRegionPolicy"] = "off";
        }

        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);

        eventDispatcher = new egret.EventDispatcher();
        loop = new HH.GameLoop(stage);
        pop = new HH.GamePanel(stage);
        sound = new HH.GameSound(stage);
        http = new HH.GameHttp(eventDispatcher, options);
        socket = new HH.GameSocket(eventDispatcher, options);
        prepare = new HH.GamePrepare(stage, eventDispatcher, options);
        load = new HH.GameLoad(options);
    }

    /**
     * 开始prepare
     *
     * @param progress
     */
    export function start(progress = 0) {
        prepare.start(progress);
    }

    export function setToken(token:string) {
        if (token) {
            http.setToken(token);
        }
    }

    export function setSocketToken(token:string) {
        if (token) {
            socket.setToken(token);
        }
    }

    /**
     * 发送get请求
     */
    export function get(cmd:string, body?:any, cbObj?:any) {
        http.get(cmd, body, cbObj);
    }

    /**
     * 发送post请求
     */
    export function post(cmd:string, body:any, cbObj?:any) {
        http.post(cmd, body, cbObj);
    }

    /**
     * 发送socket请求
     * @param body
     */
    export function syncMsg(body:any) {
        socket.sendMessage(body);
    }

    /**
     * 关闭界面
     * @param panel
     */
    export function closePanel(panel:any) {
        pop.close(panel)
    }

    /**
     * 打开界面
     * @param panel
     */
    export function openPanel(panel:any, data?:any) {
        return pop.open(panel, data);
    }

    /**
     * 面板是否是打开的
     *
     * @param panel
     * @returns {boolean}
     */
    export function isPanelShow(panel) {
        return pop.isShow(panel);
    }

    /**
     * 得到面板实例
     *
     * @param panel
     * @returns {any}
     */
    export function getPanel(panel:any) {
        return pop.getPanelByName(panel);
    }

    export function topPanel(panel:any) {
        return pop.topPanel(panel);
    }

    /**
     * 播放音乐
     * @param url
     * @param loop
     */
    export function playMusic(url:string) {
        if (sound) {
            sound.playMusic(url);
        }
    }

    /**
     * 播放音效
     * @param url
     */
    export function playSound(url:string) {
        if (sound) {
            sound.playSound(url);
        }
    }

    /**
     * 开关音乐
     * @param value
     */
    export function setMusicState(value:boolean) {
        sound.musicState = value;
    }

    export function getMusicState() {
        return sound.musicState;
    }

    /**
     * 开关音效
     * @param value
     */
    export function setSoundState(value:boolean) {
        sound.soundState = value;
    }

    export function getSoundState() {
        return sound.soundState;
    }

    /**
     * 注册秒事件
     * @param fun
     * @param scope
     * @returns {number|number}
     */
    export function registerSecond(fun:Function, scope:any) {
        return Game.registerTimer(fun, scope, 1000, 0);
    }

    /**
     * 注册enterFrame事件
     * @param fun
     * @param scope
     * @returns {number|number}
     */
    export function registerEnterFrame(fun:Function, scope:any) {
        return loop.registerEnterFrame(fun, scope);
    }

    export function registerTimer(fun:Function, scope:any, delay:number, repeat:number) {
        return loop.registerTimer(fun, scope, delay, repeat);
    }

    export function delayCall(fun:Function, scope:any) {
        loop.registerTimer(fun, scope, 0);
    }

    /**
     * 关闭计时器
     * @param id
     */
    export function clearTimer(id:number) {
        loop.clearTimer(id);
    }

    /**
     * 派发事件
     * @param type
     * @param data
     */
    export function emit(type:string, data?:any) {
        eventDispatcher.dispatchEventWith(type, false, data);
    }

    /**
     * 监听事件
     * @param type
     * @param cb
     * @param cbObj
     */
    export function on(type:string|string[], callback:Function, scope?:any, priority = 0) {
        let list = typeof type == "string" ? [type] :type;
        for (let i = 0; i < list.length; i++) {
            let t = list[i];
            eventDispatcher.addEventListener(t, callback, scope, false, priority);
        }
    }

    /**
     * 删除事件
     * @param type
     * @param cb
     * @param cbObj
     */
    export function off(type:string|string[], callback:Function, scope?:any) {
        let list = typeof type == "string" ? [type] :type;
        for (let i = 0; i < list.length; i++) {
            let t = list[i];
            eventDispatcher.removeEventListener(t, callback, scope);
        }
    }

    /**
     * 是否有事件监听
     * @param type
     * @returns {boolean}
     */
    export function hasEventListener(type:string) {
        return eventDispatcher.hasEventListener(type);
    }

    /**
     * 加载资源
     *
     * @param keys
     * @param callback
     * @param scope
     */
    export function loadResList(keys:string[], callback:Function, scope:any) {
        load.loadGroup(keys, callback, scope)
    }

    /**
     * 同步创建龙骨文件
     * @returns {T|any|null|Armature|null}
     */
    export function createArmatureSync() {
        return BoneUtil.createArmatureSync(name);
    }

    export function createArmature(name, cb:Function, scope:any) {
        BoneUtil.createArmature(name, cb, scope)
    }

    export function releaseArmature(armature) {
        BoneUtil.release(armature);
    }
}