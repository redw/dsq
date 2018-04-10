var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wanhong on 2018/4/9.
 */
var ChessData = (function () {
    function ChessData() {
        this.selfLastTime = 0;
        this.otherLastTime = 0;
        this.side = 0;
        var data = ExternalUtil.getItem("chess_token");
        if (data) {
            data = JSON.parse(data);
            this._data = data;
        }
        else {
            var open_1 = [];
            var chessboard = [];
            var chessArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf, ChessEnum.wolf,
                ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
                ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];
            for (var i = 0; i < 16; i++) {
                var obj = {};
                obj.value = chessArr[i];
                obj.open = 0;
                obj.side = ChessSideEnum.self;
                chessboard.push(obj);
                obj = {};
                obj.value = chessArr[i];
                obj.open = 0;
                obj.side = ChessSideEnum.machine;
                chessboard.push(obj);
            }
            ArrayUtil.shuffle(chessboard);
            var side = ArrayUtil.removeRandomItem([ChessSideEnum.self, ChessSideEnum.machine]);
            this._data = { side: side, selfHP: 13, otherHP: 13, lastTime: 0, chessboard: chessboard };
        }
    }
    ChessData.prototype.setChessBoard = function (chessboard) {
        this.chessboard = chessboard;
    };
    ChessData.prototype.moveChess = function (startIndex, targetIndex) {
        var startObj = this.chessboard[startIndex];
        var targetObj = this.chessboard[targetIndex];
        this.chessboard[targetIndex] = startObj;
        if (startObj) {
            startObj.index = targetIndex;
        }
        this.chessboard[startIndex] = targetObj;
        if (targetObj) {
            targetObj.index = startIndex;
        }
    };
    ChessData.prototype.killChess = function (index) {
        if (this.chessboard[index]) {
            this.chessboard[index] = null;
        }
    };
    ChessData.prototype.turnSide = function (side) {
        this.side = side;
    };
    // 得到棋盘的值 -1 空 0翻开
    ChessData.prototype.getChessValue = function (index) {
        var chessboard = this._data.chessboard;
        var value = chessboard[index] ? (chessboard[index].open ? chessboard[index].value : 0) : -1;
        return Number(value);
    };
    // 翻开棋盘
    ChessData.prototype.openValue = function (cardObj) {
        var chessboard = this._data.chessboard;
        var index = cardObj.index;
        var obj = chessboard[index];
        if (obj) {
            obj.open = 1;
            obj.value = cardObj.value;
            obj.side = cardObj.side;
        }
        else {
        }
    };
    ChessData.prototype.setChessValue = function (index, value) {
        var chessboard = this._data.chessboard;
        var obj = chessboard[index];
        if (obj) {
            obj.value = value;
        }
    };
    ChessData.prototype.getChessRealValue = function (index) {
        var chessboard = this._data.chessboard;
        return chessboard[index].value;
    };
    ChessData.prototype.clearCache = function () {
        ExternalUtil.setItem("chess_token", "");
    };
    ChessData.prototype.getChess = function (index) {
        return this.chessboard[index];
    };
    // 棋盘数据
    ChessData.prototype.getChessBoard = function () {
        return this.chessboard;
    };
    // 当前谁出手
    ChessData.prototype.getSide = function () {
        return this.side;
    };
    return ChessData;
}());
__reflect(ChessData.prototype, "ChessData");
//# sourceMappingURL=ChessData.js.map