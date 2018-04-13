var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HH;
(function (HH) {
    var GameLoad = (function () {
        function GameLoad(option) {
            this.uid = 0;
            this.waitList = [];
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.groupLoadComplete, this);
        }
        GameLoad.prototype.groupLoadComplete = function (e) {
            var name = e.groupName;
            this.doLoadComplete(name);
        };
        GameLoad.prototype.doLoadComplete = function (name, data) {
            var len = this.waitList.length;
            for (var i = 0; i < len; i += 3) {
                if (this.waitList[i] == name) {
                    var fun = this.waitList[i + 1];
                    var scope = this.waitList[i + 2];
                    fun.call(scope, data, name);
                    this.waitList.splice(i, 3);
                    break;
                }
            }
        };
        /**
         * 加载group资源
         * @param urlList
         * @param completeCb
         * @param progressCb
         * @param context
         * @param name
         * @param property
         * @aliasName
         * @
         */
        GameLoad.prototype.loadGroup = function (urlList, completeCb, context, name, property) {
            this.uid++;
            if (!name) {
                name = "group_#_" + this.uid;
            }
            if (name == "preload") {
                for (var i = 0, len = urlList.length; i < len; i++) {
                    urlList[i].url += "?+" + Math.random();
                }
                this.waitList.push(name, completeCb, context);
                RES.loadGroup("preload");
            }
            else {
                this.waitList.push(name, completeCb, context);
                RES.createGroup(name, urlList);
                RES.loadGroup(name, property);
            }
        };
        GameLoad.prototype.loadConfigGroup = function (group, back, context, name) {
            var len = group ? group.length : 0;
            var list = [];
            for (var i = 0; i < len; i++) {
                list.push(group[i].url);
            }
            this.loadGroup(list, back, context, name);
        };
        /**
         * 加载dragonBone资源
         * @param name
         * @param back
         * @param cb
         * @param cbThis
         */
        GameLoad.prototype.loadDragonBone = function (name, cb, cbObj, property) {
            var res = [];
            res.push(name + "_ske_json");
            res.push(name + "_tex_json");
            res.push(name + "_tex_png");
            this.loadGroup(res, cb, cbObj, name, property);
        };
        GameLoad.prototype.loadMC = function (name, cb, cbObj, property) {
            var res = [];
            res.push(name + "_json");
            res.push(name + "_png");
            this.loadGroup(res, cb, cbObj, name, property);
        };
        /**
         * 加载list
         * @param urlList
         * @param compFunc
         * @param progFunc
         * @param thisObject
         */
        GameLoad.prototype.loadList = function (urlList, compFunc, progFunc, thisObject) {
            var resList = {};
            var urlLen = urlList.length;
            function next() {
                var url = urlList.shift();
                RES.getResByUrl(url, function (res) {
                    resList[url] = res;
                    if (progFunc) {
                        progFunc.call(thisObject, (urlLen - urlList.length) / urlLen);
                    }
                    if (urlList.length <= 0) {
                        compFunc.call(thisObject, resList);
                    }
                    else {
                        next();
                    }
                }, this);
            }
            next();
        };
        return GameLoad;
    }());
    HH.GameLoad = GameLoad;
    __reflect(GameLoad.prototype, "HH.GameLoad");
})(HH || (HH = {}));
