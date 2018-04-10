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
        _this.curSide = 0;
        _this.effectType = 0;
        _this.skinName = AnimalPanelSkin;
        return _this;
    }
    GamePanel.prototype.init = function () {
        this.chessArr = [];
        this.chessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.createCheckerboard();
    };
    GamePanel.prototype.active = function () {
        var side = GameData.chess.getSide();
        this.turnSide(side);
    };
    GamePanel.prototype.turnSide = function (side) {
        if (this.curSide != side) {
            this.curSide = side;
            if (side == ChessSideEnum.self) {
            }
            else {
                ChessAI.analysis(GameData.chess.getChessBoard(), 13, 13, ChessSideEnum.other);
            }
        }
    };
    GamePanel.prototype.onTouchTap = function (e) {
        if (this.curSide == ChessSideEnum.self) {
            var card = e.target;
            var index = card.index;
            var value = GameData.chess.getChessValue(index);
            if (!value) {
                value = GameData.chess.getChessRealValue(index);
                // 翻开
                GameData.chess.openValue(index);
                card.once("flop_complete", this.onFlopComplete, this);
                card.flop(value);
            }
        }
        else {
            Notice.show("现在轮到对方");
        }
    };
    GamePanel.prototype.onFlopComplete = function () {
        console.log("翻开完成");
    };
    // 创建棋盘
    GamePanel.prototype.createCheckerboard = function () {
        var chessData = GameData.chess.getChessBoard();
        for (var i = 0, len = chessData.length; i < len; i++) {
            var obj = Util.mixin(chessData[i], {});
            var chess = new ChessItem();
            chess.index = i;
            var value = GameData.chess.getChessValue(i);
            chess.reset({ index: i, side: obj.side, value: value });
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    };
    GamePanel.prototype.destory = function () {
    };
    return GamePanel;
}(BasePanel));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map