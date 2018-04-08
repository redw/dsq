module HH {
    export class GameSocket {
        public token:string;
        private host:string;
        private port = 0;
        private log = 0;
        private reconnectDelay = 0;
        private reconnectCount = 0;
        private meanTimeCount = 0;
        private socket:egret.WebSocket;
        private waitList = [];
        private timeId = 0;
        private eventDispatcher:egret.EventDispatcher;

        public constructor(eventDispatcher:egret.EventDispatcher, options:any) {
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

        private timerPingId:number = 0;

        // 接收消息
        private onReceiveMessage(e:egret.ProgressEvent) {
            let socket = e.target;
            var msg = socket.readUTF();
            var msgObj = JSON.parse(msg);
            if (this.log) {
                console.log("[socket_response]<<<---", msg);
            }
            this.eventDispatcher.dispatchEventWith("SOCKET_MESSAGE", false, msgObj);
        }


        public setToken(token:string) {
            if (token) {
                this.token = token;
            }
        }


        // 连接成功
        private onSocketOpen() {
            console.log("connect success：");
            this.eventDispatcher.dispatchEventWith("SOCKET_CONNECT");
            if (this.timeId) {
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            }
            this.trySendMessage();
        }

        // 连接断开
        private onSocketClose(e:egret.Event) {
            this.eventDispatcher.dispatchEventWith("SOCKET_CLOSE");
            console.log("connect fail：", e.data);
            if (!this.timeId) {
                this.timeId = Game.registerTimer(this.onConnect, this, this.reconnectDelay, this.reconnectCount);
            }
            if (this.timerPingId) {
                Game.clearTimer(this.timerPingId);
                this.timerPingId = 0;
            }
        }

        private onConnect(advanceTime:number, remainCount:number) {
            if (remainCount == 1) {
                this.eventDispatcher.dispatchEventWith("SOCKET_INVALID");
                Game.clearTimer(this.timeId);
                this.timeId = 0;
            } else {
                this.connect();
            }
        }

        // 发送消息
        public sendMessage(msg:any) {
            this.waitList.push(msg);
            this.trySendMessage();
        }

        private trySendMessage() {
            let connected = this.socket.connected;
            let meanTimeCount = this.meanTimeCount;
            let waitCount = this.waitList.length;
            let len = Math.min(waitCount, meanTimeCount);
            if (connected) {
                for (let i = 0; i < len; i++) {
                    let obj = this.waitList.shift();
                    // obj.token = this.token;
                    let msg = JSON.stringify(obj);
                    if (this.log) {
                        console.log("[socket_send]--->>>", msg);
                    }
                    this.socket.writeUTF(msg);
                    // this.socket.flush();
                }
            }
        }

        public close() {
            this.socket.close();
        }

        public connect() {
            if (this.port) {
                this.socket.connect(this.host, this.port)
            }
            else {
                this.socket.connectByUrl(this.host);
            }
            if (this.log) {
                console.log("socket connect:", this.host, this.port);
            }
        }
    }
}