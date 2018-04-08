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
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this.sizeX = 4;
        _this.sizeY = 8;
        _this.chessArr = [];
        _this.chessData = [];
        _this.effectType = 0;
        _this.skinName = AnimalPanelSkin;
        return _this;
    }
    GamePanel.prototype.init = function () {
        var chessArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf, ChessEnum.wolf,
            ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
            ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];
        var chessData = this.chessData;
        chessData.length = 0;
        for (var i = 0; i < 16; i++) {
            var obj = {};
            obj.value = chessArr[i];
            obj.side = 1;
            chessData.push(obj);
            obj = {};
            obj.value = chessArr[i];
            obj.side = 2;
            chessData.push(obj);
        }
        ArrayUtil.shuffle(chessData);
        for (var i = 0, len = chessData.length; i < len; i++) {
            var obj = chessData[i];
            obj.index = i;
            obj.row = ~~(i / 4);
            obj.col = i % 4;
        }
        this.createCheckerboard();
    };
    // 创建棋盘
    GamePanel.prototype.createCheckerboard = function () {
        var chessData = this.chessData;
        for (var i = 0, len = chessData.length; i < len; i++) {
            var obj = chessData[i];
            var chess = new Chess();
            chess.reset(obj);
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    };
    return GamePanel;
}(BasePanel));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map