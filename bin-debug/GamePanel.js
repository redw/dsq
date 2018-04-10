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
        _this.curSide = 0;
        _this.effectType = 0;
        _this.skinName = AnimalPanelSkin;
        _this.chessArr = [];
        return _this;
    }
    GamePanel.prototype.init = function () {
        this.logic = new ChessLogic();
        this.logic.addEventListener("move_chess", this.onMoveChess, this);
        this.logic.addEventListener("kill_chess", this.onKillChess, this);
        this.logic.addEventListener("flop_chess", this.onFlopChess, this);
        this.logic.addEventListener("turn_side", this.onTurnSide, this);
        this.logic.addEventListener("generate_chessboard", this.onGenerateChessBoard, this);
        this.logic.start();
    };
    GamePanel.prototype.addToStage = function () {
        this.chessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    // 生成棋盘数据
    GamePanel.prototype.onGenerateChessBoard = function (e) {
        console.log("事件-生成棋盘");
        var data = e.data;
        GameData.chess.setChessBoard(data);
        this.createCheckerboard();
    };
    // 轮到某人
    GamePanel.prototype.onTurnSide = function (e) {
        var side = e.data;
        console.log("事件-轮到某方", side);
        GameData.chess.turnSide(side);
        var selfArrow = DisplayUtil.getChildByName(this.blueGroup, "arrowImg");
        var otherArrow = DisplayUtil.getChildByName(this.redGroup, "arrowImg");
        if (side == ChessSideEnum.self) {
            selfArrow.visible = true;
            otherArrow.visible = false;
        }
        else {
            selfArrow.visible = false;
            otherArrow.visible = true;
        }
    };
    // 移动棋子
    GamePanel.prototype.onMoveChess = function (e) {
    };
    // 吃棋子
    GamePanel.prototype.onKillChess = function (e) {
    };
    // 翻棋子
    GamePanel.prototype.onFlopChess = function (e) {
        var data = e.data;
        var index = data.index;
        console.log("事件-翻牌");
        GameData.chess.openValue(index, data.value);
        var chess = this.chessArr[index];
        chess.flop(data.value);
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
                // let actionObj = ChessAI.analysis(GameData.chess.getChessBoard(),13, 13, ChessSideEnum.other);
            }
        }
    };
    GamePanel.prototype.onTouchTap = function (e) {
        if (GameData.chess.getSide() == ChessSideEnum.self) {
            var card = e.target;
            var index = card.index;
            var chessObj = GameData.chess.getChess(index);
            if (chessObj) {
                if (chessObj.open) {
                    this.showTip();
                }
                else {
                    this.logic.dispatchEventWith("request_flop", false, index);
                }
            }
            else {
                console.error("系统出错");
            }
        }
        else {
            Notice.show("当前没轮到自己");
        }
    };
    GamePanel.prototype.showTip = function () {
        console.log("显示提示");
    };
    // 创建棋盘
    GamePanel.prototype.createCheckerboard = function () {
        this.chessArr.length = 0;
        var chessData = GameData.chess.getChessBoard();
        for (var i = 0, len = chessData.length; i < len; i++) {
            var chess = new ChessItem();
            chess.index = i;
            var value = GameData.chess.getChess(i);
            chess.reset(value);
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    };
    GamePanel.prototype.onFlopComplete = function () {
        console.log("翻开完成");
    };
    GamePanel.prototype.destory = function () {
    };
    return GamePanel;
}(BasePanel));
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map