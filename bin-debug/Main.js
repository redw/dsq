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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        if (_this.stage) {
            _this.addToStage();
        }
        else {
            _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        }
        return _this;
    }
    Main.prototype.addToStage = function () {
        Game.init(this.stage, {});
        GameData.boot();
        Game.on(GameEvent.PREPARE_COMPLETE, this.startGame, this);
        Game.start();
    };
    Main.prototype.startGame = function () {
        Game.playMusic("bgm_huoguo_mp3");
        Game.openPanel(GamePanel);
    };
    return Main;
}(egret.DisplayObject));
__reflect(Main.prototype, "Main");
