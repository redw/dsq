var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wanhong on 2018/4/9.
 */
var GameData = (function () {
    function GameData() {
    }
    GameData.boot = function () {
        GameData.chess = new ChessData();
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map