/**
 * Created by wanhong on 2018/3/17.
 */
module RedPointUtil {
    import init = Game.init;
    let disInfoArr;
    let initOk = false;

    export function boot() {
        if (!initOk) {
            initOk = true;
            disInfoArr = [];
            Game.registerSecond(checkList, null);
        }
    }

    function checkList() {
        let len = disInfoArr.length;
        for (let i = len - 1; i >= 0; i--) {
            let info = disInfoArr[i];
            if (info) {
                let {dis, fun, scope, param, options} = info;
                if (dis.width && dis.height) {
                    let count = (fun.call(scope, param));
                    if (count && dis.stage && dis.visible && dis.alpha) {
                        showRedPoint(dis, count, options);
                    } else {
                        hideRedPoint(dis);
                    }
                }
            }
        }
    }

    function showRedPoint(dis:egret.DisplayObject, count:number, options:any) {
        if (dis) {
            let redPoint:RedPoint =  (dis["__red__point"]);
            if (!redPoint) {
                redPoint = RedPoint.pool.create();
                dis["__red__point"] = redPoint;
            }
            if (!options.width)  {
                options.width = dis.width;
            }
            let offX = options.offX || 0;
            let offY = options.offY || 0;
            redPoint.x = (options.width) + offX;
            redPoint.y = offY;
            if (dis instanceof egret.DisplayObjectContainer) {
                if (redPoint.parent) {
                    redPoint.parent.setChildIndex(redPoint, 1000)
                } else {
                    dis["addChild"](redPoint);
                }
            } else {
                redPoint.x += dis.x - dis.anchorOffsetX * dis.scaleX;
                redPoint.y += dis.y - dis.anchorOffsetY * dis.scaleY;
                if (redPoint.parent) {
                    redPoint.parent.setChildIndex(redPoint, 1000);
                } else {
                    dis.parent["addChild"](redPoint);
                }
            }
            redPoint.setData(count);
        }
    }

    function hideRedPoint(dis:egret.DisplayObject) {
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
    export function add(dis:egret.DisplayObject, fun:Function, scope?:any, options?:any, param?:any) {
        boot();
        if (dis) {
            let index = disInfoArr.indexOf(dis);
            if (index < 0) {
                let info:any = {};
                info.dis = dis;
                info.fun = fun;
                info.scope = scope;
                info.param = param;
                info.options = options || {};
                dis["__red__point_info"] = info;
                disInfoArr.push(info);
            } else {
                egret.warn("注册小红点时不能为空");
            }
        } else {
            egret.warn("注册小红点时不能为空");
        }
    }

    export function remove(dis:egret.DisplayObject) {
        if (dis) {
            let info = dis["__red__point_info"];
            if (info) {
                ArrayUtil.removeItem(disInfoArr, info);
                info.fun = null;
                info.dis = null;
                info.scope = null;
                info.param = null;
                info.options = null;
                delete dis["__red__point_info"]
            }
            if (dis["__red__point"]) {

            }
        }
    }

    export function update(dis:egret.DisplayObject, param:any) {
        if (dis) {
            let info = dis["__red__point_info"];
            if (info) {
                info.param = param;
            }
        }
    }
}
