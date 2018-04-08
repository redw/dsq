module HH {
    export class GameHttp {
        MEAN_WHILE = 2;
        host = "";
        token;
        stateMap:any;
        errorArr:string[];
        requestCount = 0;
        reqList:any[];
        freeReqList:any[];
        freeLoaderList:egret.URLLoader[];
        log = 0;

        private eventDispatcher:egret.EventDispatcher;

        public constructor(eventDispatcher:egret.EventDispatcher, option:any) {
            this.eventDispatcher = eventDispatcher;
            this.host = Util.getPropValue(option, "http");
            this.log = Util.getPropValue(option, "log");
            this.requestCount = 0;
            this.reqList = [];
            this.stateMap = {};
            this.errorArr = [];
            this.freeLoaderList = [];
            this.freeReqList = [];
        }

        public setToken(token:string) {
            if (token) {
                this.token = token;
            }
        }

        public send(cmd:string, body:any, cbObj?:any, method = "get") {
            let reqInfo:any = null;
            if (this.freeReqList.length) {
                reqInfo = this.freeReqList.pop();
            } else {
                reqInfo = {};
            }
            reqInfo.cmd = cmd;
            reqInfo.body = body;
            reqInfo.method = method;
            reqInfo.cbObj = cbObj || {};
            this.reqList.push(reqInfo);
            this.next();
        }

        public get(cmd:string, body:any, cbObj?:any) {
            this.send(cmd, body, cbObj, "get");
        }

        public post(cmd:string, body:any, cbObj?:any) {
            this.send(cmd, body, cbObj, "post");
        }

        next() {
            if (this.reqList.length > 0 && this.requestCount < this.MEAN_WHILE) {
                this.requestCount++;
                let reqInfo = this.reqList.shift();
                let request = this.getRequest(reqInfo);
                let loader = this.getLoader();
                loader["__reqInfo"] = reqInfo;
                loader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                loader.load(request);
            }
        }

        getRequest(req:any) {
            let args:any = req.body;
            let method = req.method;
            let cmd = req.cmd;
            let request:egret.URLRequest;
            let url = this.host;
            let isGet = String(method).toLowerCase() != "post";
            let keyValue = ``;
            for (let key in args) {
                keyValue += `&${key}=${args[key]}`;
            }
            if (this.token) {
                keyValue += '&token=' + this.token;
            }
            keyValue = keyValue.substr(1);

            if (isGet) {
                url += cmd + "?";
                request = new egret.URLRequest(url + keyValue);
                request.method = egret.URLRequestMethod.GET;
            } else {
                url += cmd;
                request = new egret.URLRequest(url);
                request.method = egret.URLRequestMethod.POST;
                request.data = new egret.URLVariables(keyValue);

            }
            if (this.log) {
                console.log(`>>>  ${isGet ? "get" : "post"} ${url + (isGet ? "" : "?") + keyValue}`);
            }
            return request;
        }

        getLoader() {
            let loader = this.freeLoaderList.pop();
            if (!loader) {
                loader = new egret.URLLoader();
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            }
            return loader;
        }

        onComplete(e:egret.Event) {
            let loader:egret.URLLoader = e.target;
            this.doResponse(loader);
        }

        onError(e:egret.IOErrorEvent) {
            let loader:egret.URLLoader = e.target;
            this.doError(loader);
        }

        doError(loader:egret.URLLoader) {
            let reqInfo:any = loader["__reqInfo"];
            let end = false;
            let req = reqInfo.body;
            let cmd = reqInfo.cmd;
            // alert("异常数据"+loader.data);
            let res = JSON.parse(loader.data);
            if (this.log) {
                console.log(`>>>  res} ${cmd}`, res);
            }
            if (res) {
                let error = +res.code;
                if (error) {
                    if (this.stateMap[cmd] === undefined) {
                        this.stateMap[cmd] = 1;
                    } else {
                        this.stateMap[cmd] = this.stateMap[cmd] + 1;
                        if (this.stateMap[cmd] > 3) {
                            this.errorArr.push(cmd);
                        }
                        this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE_ERROR", false, cmd);
                    }
                    if (this.stateMap[cmd] >= 3) {
                        end = true;
                    } else {
                        let request = this.getRequest(reqInfo);
                        loader.load(request);
                    }
                } else {
                    end = true;
                }
                if (end) {
                    if (typeof reqInfo.cbObj == "function") {
                        reqInfo.cbObj(res, req);
                    } else {
                        let {cb, scope} = reqInfo.cbObj;
                        if (cb) {
                            cb.call(scope, res, req);
                        }
                    }

                    this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE", false, {req: req, res: res});
                    this.stateMap[cmd] = 0;
                    loader["__reqInfo"] = null;
                    loader.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
                    loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                    reqInfo.body = null;
                    reqInfo.method = null;
                    reqInfo.cbObj = null;
                    reqInfo.cmd = null;
                    this.freeReqList.push(reqInfo);
                    this.freeLoaderList.push(loader);
                    ArrayUtil.removeItem(this.errorArr, cmd);
                    this.requestCount -= 1;
                    this.next();
                }
            } else {
                this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE_ERROR", false, cmd);
            }
        }

        doResponse(loader:egret.URLLoader) {
            let reqInfo:any = loader["__reqInfo"];
            let req = reqInfo.body;
            let cmd = reqInfo.cmd;
            // alert("返回数据"+loader.data);
            let res = JSON.parse(loader.data);
            
            if (this.log) {
                console.log(cmd, res);
            }
            if (res) {
                if (typeof reqInfo.cbObj == "function") {
                    reqInfo.cbObj(res, reqInfo);
                } else {
                    let {cb, scope} = reqInfo.cbObj;
                    if (cb) {
                        cb.call(scope, res, reqInfo);
                    }
                }
                this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE", false, {req: reqInfo, res: res});
                this.stateMap[cmd] = 0;
                loader["__reqInfo"] = null;
                loader.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
                loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                reqInfo.body = null;
                reqInfo.method = null;
                reqInfo.cbObj = null;
                reqInfo.cmd = null;
                this.freeReqList.push(reqInfo);
                this.freeLoaderList.push(loader);
                ArrayUtil.removeItem(this.errorArr, cmd);
                this.requestCount -= 1;
                this.next();
            }
        }
    }
}