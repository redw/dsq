var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HH;
(function (HH) {
    var GameHttp = (function () {
        function GameHttp(eventDispatcher, option) {
            this.MEAN_WHILE = 2;
            this.host = "";
            this.requestCount = 0;
            this.log = 0;
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
        GameHttp.prototype.setToken = function (token) {
            if (token) {
                this.token = token;
            }
        };
        GameHttp.prototype.send = function (cmd, body, cbObj, method) {
            if (method === void 0) { method = "get"; }
            var reqInfo = null;
            if (this.freeReqList.length) {
                reqInfo = this.freeReqList.pop();
            }
            else {
                reqInfo = {};
            }
            reqInfo.cmd = cmd;
            reqInfo.body = body;
            reqInfo.method = method;
            reqInfo.cbObj = cbObj || {};
            this.reqList.push(reqInfo);
            this.next();
        };
        GameHttp.prototype.get = function (cmd, body, cbObj) {
            this.send(cmd, body, cbObj, "get");
        };
        GameHttp.prototype.post = function (cmd, body, cbObj) {
            this.send(cmd, body, cbObj, "post");
        };
        GameHttp.prototype.next = function () {
            if (this.reqList.length > 0 && this.requestCount < this.MEAN_WHILE) {
                this.requestCount++;
                var reqInfo = this.reqList.shift();
                var request = this.getRequest(reqInfo);
                var loader = this.getLoader();
                loader["__reqInfo"] = reqInfo;
                loader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                loader.load(request);
            }
        };
        GameHttp.prototype.getRequest = function (req) {
            var args = req.body;
            var method = req.method;
            var cmd = req.cmd;
            var request;
            var url = this.host;
            var isGet = String(method).toLowerCase() != "post";
            var keyValue = "";
            for (var key in args) {
                keyValue += "&" + key + "=" + args[key];
            }
            if (this.token) {
                keyValue += '&token=' + this.token;
            }
            keyValue = keyValue.substr(1);
            if (isGet) {
                url += cmd + "?";
                request = new egret.URLRequest(url + keyValue);
                request.method = egret.URLRequestMethod.GET;
            }
            else {
                url += cmd;
                request = new egret.URLRequest(url);
                request.method = egret.URLRequestMethod.POST;
                request.data = new egret.URLVariables(keyValue);
            }
            if (this.log) {
                console.log(">>>  " + (isGet ? "get" : "post") + " " + (url + (isGet ? "" : "?") + keyValue));
            }
            return request;
        };
        GameHttp.prototype.getLoader = function () {
            var loader = this.freeLoaderList.pop();
            if (!loader) {
                loader = new egret.URLLoader();
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            }
            return loader;
        };
        GameHttp.prototype.onComplete = function (e) {
            var loader = e.target;
            this.doResponse(loader);
        };
        GameHttp.prototype.onError = function (e) {
            var loader = e.target;
            this.doError(loader);
        };
        GameHttp.prototype.doError = function (loader) {
            var reqInfo = loader["__reqInfo"];
            var end = false;
            var req = reqInfo.body;
            var cmd = reqInfo.cmd;
            // alert("异常数据"+loader.data);
            var res = JSON.parse(loader.data);
            if (this.log) {
                console.log(">>>  res} " + cmd, res);
            }
            if (res) {
                var error = +res.code;
                if (error) {
                    if (this.stateMap[cmd] === undefined) {
                        this.stateMap[cmd] = 1;
                    }
                    else {
                        this.stateMap[cmd] = this.stateMap[cmd] + 1;
                        if (this.stateMap[cmd] > 3) {
                            this.errorArr.push(cmd);
                        }
                        this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE_ERROR", false, cmd);
                    }
                    if (this.stateMap[cmd] >= 3) {
                        end = true;
                    }
                    else {
                        var request = this.getRequest(reqInfo);
                        loader.load(request);
                    }
                }
                else {
                    end = true;
                }
                if (end) {
                    if (typeof reqInfo.cbObj == "function") {
                        reqInfo.cbObj(res, req);
                    }
                    else {
                        var _a = reqInfo.cbObj, cb = _a.cb, scope = _a.scope;
                        if (cb) {
                            cb.call(scope, res, req);
                        }
                    }
                    this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE", false, { req: req, res: res });
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
            else {
                this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE_ERROR", false, cmd);
            }
        };
        GameHttp.prototype.doResponse = function (loader) {
            var reqInfo = loader["__reqInfo"];
            var req = reqInfo.body;
            var cmd = reqInfo.cmd;
            // alert("返回数据"+loader.data);
            var res = JSON.parse(loader.data);
            if (this.log) {
                console.log(cmd, res);
            }
            if (res) {
                if (typeof reqInfo.cbObj == "function") {
                    reqInfo.cbObj(res, reqInfo);
                }
                else {
                    var _a = reqInfo.cbObj, cb = _a.cb, scope = _a.scope;
                    if (cb) {
                        cb.call(scope, res, reqInfo);
                    }
                }
                this.eventDispatcher.dispatchEventWith("HTTP_MESSAGE", false, { req: reqInfo, res: res });
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
        };
        return GameHttp;
    }());
    HH.GameHttp = GameHttp;
    __reflect(GameHttp.prototype, "HH.GameHttp");
})(HH || (HH = {}));
