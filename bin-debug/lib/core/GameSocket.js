var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HH;
(function (HH) {
    var GameSocket = (function () {
        function GameSocket(eventDispatcher, options) {
            this.port = 0;
            this.log = 0;
            this.reconnectDelay = 0;
            this.reconnectCount = 0;
            this.meanTimeCount = 0;
            this.waitList = [];
            this.timeId = 0;
            this.timerPingId = 0;
            this.eventDispatcher = eventDispatcher;
            this.host = Util.getPropValue(options, "remote");
            this.port = Util.getPropValue(options, "port", 0);
            this.log = Util.getPropValue(options, "log", 1);
            this.reconnectDelay = Util.getPropValue(options, "reconnectDelay", 300);
            this.reconnectCount = Util.getPropValue(options, "reconnectCount", 10);
            this.meanTimeCount = Util.getPropValue(options, "meanTimeCount", 5);
            if (!this.host) {
                this.host = options;
            }
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            // this.connect();
        }
        // 接收消息
        GameSocket.prototype.onReceiveMessage = function (e) {
            var socket = e.target;
            var msg = socket.readUTF();
            var msgObj = JSON.parse(msg);
            if (this.log) {
                console.log("[socket_response]<<<---", msg);
            }
            this.eventDispatcher.dispatchEventWith("SOCKET_MESSAGE", false, msgObj);
        };
        GameSocket.prototype.setToken = function (token) {
            if (token) {
                this.token = token;
            }
        };
        // 连接成功
        GameSocket.prototype.onSocketOpen = function () {
            console.log("connect success：");
            this.eventDispatcher.dispatchEventWith("SOCKET_CONNECT");
            if (this.timeId) {
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            this.trySendMessage();
        };
        // 连接断开
        GameSocket.prototype.onSocketClose = function (e) {
            this.eventDispatcher.dispatchEventWith("SOCKET_CLOSE");
            console.log("connect fail：", e.data);
            if (!this.timeId) {
                this.timeId = Game.registerTimer(this.onConnect, this, this.reconnectDelay, this.reconnectCount);
            }
            if (this.timerPingId) {
                Game.clearTimer(this.timerPingId);
                this.timerPingId = 0;
            }
        };
        GameSocket.prototype.onConnect = function (advanceTime, remainCount) {
            if (remainCount == 1) {
                this.eventDispatcher.dispatchEventWith("SOCKET_INVALID");
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            else {
                this.connect();
            }
        };
        // 发送消息
        GameSocket.prototype.sendMessage = function (msg) {
            this.waitList.push(msg);
            this.trySendMessage();
        };
        GameSocket.prototype.trySendMessage = function () {
            var connected = this.socket.connected;
            var meanTimeCount = this.meanTimeCount;
            var waitCount = this.waitList.length;
            var len = Math.min(waitCount, meanTimeCount);
            if (connected) {
                for (var i = 0; i < len; i++) {
                    var obj = this.waitList.shift();
                    // obj.token = this.token;
                    var msg = JSON.stringify(obj);
                    if (this.log) {
                        console.log("[socket_send]--->>>", msg);
                    }
                    this.socket.writeUTF(msg);
                    // this.socket.flush();
                }
            }
        };
        GameSocket.prototype.close = function () {
            this.socket.close();
        };
        GameSocket.prototype.connect = function () {
            if (this.port) {
                this.socket.connect(this.host, this.port);
            }
            else {
                this.socket.connectByUrl(this.host);
            }
            if (this.log) {
                console.log("socket connect:", this.host, this.port);
            }
        };
        return GameSocket;
    }());
    HH.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "HH.GameSocket");
})(HH || (HH = {}));
//# sourceMappingURL=GameSocket.js.map