/**
 * Created by wanhong on 2018/3/17.
 */
var RedPointUtil;
(function (RedPointUtil) {
    var disInfoArr;
    var initOk = false;
    function boot() {
        if (!initOk) {
            initOk = true;
            disInfoArr = [];
            Game.registerSecond(checkList, null);
        }
    }
    RedPointUtil.boot = boot;
    function checkList() {
        var len = disInfoArr.length;
        for (var i = len - 1; i >= 0; i--) {
            var info = disInfoArr[i];
            if (info) {
                var dis = info.dis, fun = info.fun, scope = info.scope, param = info.param, options = info.options;
                if (dis.width && dis.height) {
                    var count = (fun.call(scope, param));
                    if (count && dis.stage && dis.visible && dis.alpha) {
                        showRedPoint(dis, count, options);
                    }
                    else {
                        hideRedPoint(dis);
                    }
                }
            }
        }
    }
    function showRedPoint(dis, count, options) {
        if (dis) {
            var redPoint = (dis["__red__point"]);
            if (!redPoint) {
                redPoint = RedPoint.pool.create();
                dis["__red__point"] = redPoint;
            }
            if (!options.width) {
                options.width = dis.width;
            }
            var offX = options.offX || 0;
            var offY = options.offY || 0;
            redPoint.x = (options.width) + offX;
            redPoint.y = offY;
            if (dis instanceof egret.DisplayObjectContainer) {
                if (redPoint.parent) {
                    redPoint.parent.setChildIndex(redPoint, 1000);
                }
                else {
                    dis["addChild"](redPoint);
                }
            }
            else {
                redPoint.x += dis.x - dis.anchorOffsetX * dis.scaleX;
                redPoint.y += dis.y - dis.anchorOffsetY * dis.scaleY;
                if (redPoint.parent) {
                    redPoint.parent.setChildIndex(redPoint, 1000);
                }
                else {
                    dis.parent["addChild"](redPoint);
                }
            }
            redPoint.setData(count);
        }
    }
    function hideRedPoint(dis) {
        if (dis) {
            if (dis["__red__point"]) {
                RedPoint.pool.release(dis["__red__point"]);
                delete dis["__red__point"];
            }
        }
    }
    /**
     * 注册红点
     *
     * @param dis
     * @param fun
     * @param scope
     * @param options
     * @param param
     */
    function add(dis, fun, scope, options, param) {
        boot();
        if (dis) {
            var index = disInfoArr.indexOf(dis);
            if (index < 0) {
                var info = {};
                info.dis = dis;
                info.fun = fun;
                info.scope = scope;
                info.param = param;
                info.options = options || {};
                dis["__red__point_info"] = info;
                disInfoArr.push(info);
            }
            else {
                egret.warn("注册小红点时不能为空");
            }
        }
        else {
            egret.warn("注册小红点时不能为空");
        }
    }
    RedPointUtil.add = add;
    function remove(dis) {
        if (dis) {
            var info = dis["__red__point_info"];
            if (info) {
                ArrayUtil.removeItem(disInfoArr, info);
                info.fun = null;
                info.dis = null;
                info.scope = null;
                info.param = null;
                info.options = null;
                delete dis["__red__point_info"];
            }
            if (dis["__red__point"]) {
            }
        }
    }
    RedPointUtil.remove = remove;
    function update(dis, param) {
        if (dis) {
            var info = dis["__red__point_info"];
            if (info) {
                info.param = param;
            }
        }
    }
    RedPointUtil.update = update;
})(RedPointUtil || (RedPointUtil = {}));
