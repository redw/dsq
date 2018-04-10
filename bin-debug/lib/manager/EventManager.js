var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        var _this = _super.call(this) || this;
        _this.eventDisPatcher = new egret.EventDispatcher();
        return _this;
    }
    EventManager.prototype.dispatch = function (cmd, data) {
        this.eventDisPatcher.dispatchEventWith(cmd, false, data);
    };
    EventManager.prototype.has = function (cmd) {
        return this.eventDisPatcher.hasEventListener(cmd);
    };
    EventManager.prototype.once = function (cmd, cb, cbObj) {
        this.eventDisPatcher.once(cmd, cb, cbObj);
    };
    EventManager.prototype.on = function (cmd, cb, cbObj) {
        this.eventDisPatcher.addEventListener(cmd, cb, cbObj);
    };
    EventManager.prototype.off = function (cmd, cb, cbObj) {
        this.eventDisPatcher.removeEventListener(cmd, cb, cbObj);
    };
    return EventManager;
}(egret.EventDispatcher));
__reflect(EventManager.prototype, "EventManager");
