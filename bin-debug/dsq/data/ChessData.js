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
    // 得到棋盘的值 -1 空 0翻开
    ChessData.prototype.getChessValue = function (index) {
        var chessboard = this._data.chessboard;
        return chessboard[index] ? (open[index] ? open[index].value : 0) : -1;
    };
    ChessData.prototype.getChessRealValue = function (index) {
        var chessboard = this._data.chessboard;
        return chessboard[index].value;
    };
    ChessData.prototype.clearCache = function () {
        ExternalUtil.setItem("chess_token", "");
    };
    // 棋盘数据
    ChessData.prototype.getChessBoard = function () {
        return this._data.chessboard;
    };
    // 当前谁出手
    ChessData.prototype.getSide = function () {
        return this._data.side;
    };
    return ChessData;
}());
__reflect(ChessData.prototype, "ChessData");
//# sourceMappingURL=ChessData.js.map