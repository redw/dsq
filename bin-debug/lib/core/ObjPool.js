var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 简单的对象池
 *
 * Created by hh on 2017/6/12 0012.
 */
var ObjPool = (function () {
    function ObjPool(funC, size) {
        if (size === void 0) { size = 0; }
        this.funC = funC;
        this.list = [];
        if (size) {
            this.resize(size);
        }
    }
    ObjPool.prototype.resize = function (size) {
        var list = this.list;
        while (list.length > size) {
            list.pop();
        }
        while (list.length < size) {
            list.push(this.create());
        }
        return this;
    };
    ObjPool.prototype.create = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var list = this.list;
        if (list.length) {
            return list.pop();
        }
        else {
            if (param.length == 1) {
                return new this.funC(param[0]);
            }
            else if (param.length == 2) {
                return new this.funC(param[0], param[1]);
            }
            else if (param.length == 3) {
                return new this.funC(param[0], param[1], param[2]);
            }
            else if (param.length == 4) {
                return new this.funC(param[0], param[1], param[2], param[3]);
            }
            return new this.funC();
        }
    };
    ObjPool.prototype.release = function (value) {
        if (value) {
            if (value.release) {
                value.release();
            }
            this.list.push(value);
        }
        return value;
    };
    return ObjPool;
}());
__reflect(ObjPool.prototype, "ObjPool");
//# sourceMappingURL=ObjPool.js.map