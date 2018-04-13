var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessAI = (function () {
    function ChessAI(logic) {
        this.logic = logic;
        this.chessboard = logic.chessboard;
    }
    ChessAI.prototype.calc = function () {
        var actions = this.getAllAction(this.chessboard);
        var action = actions.shift();
        console.log("翻牌行为:", action);
        return action;
    };
    // 得到所有的动作
    ChessAI.prototype.getAllAction = function (chessArray) {
        var actions = [];
        var dir = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        for (var i = 0, len = chessArray.length; i < len; i++) {
            var x = i % 4;
            var y = ~~(i / 4);
            var chess = chessArray[i];
            if (chess) {
                if (chess.open) {
                    if (chess.side == ChessSideEnum.machine) {
                        var checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                        for (var d = 0; d < dir.length; d++) {
                            var count = 0;
                            for (var n = 1; n <= checkCount; n++) {
                                var newX = x + dir[d].x * n;
                                var newY = y + dir[d].y * n;
                                if (this.logic.inAreaByXY(newX, newY)) {
                                    var targetChess = this.logic.getChessByXY(newX, newY);
                                    if (targetChess) {
                                        if (chess.value == ChessEnum.bomb) {
                                            count++;
                                        }
                                        if (targetChess.open &&
                                            chess.side != targetChess.side &&
                                            ChessUtil.canEat(chess.value, targetChess.value)) {
                                            if (chess.value == ChessEnum.bomb) {
                                                if (count == 2) {
                                                    actions.push({ type: "kill", data: { start: { x: x, y: y }, target: { x: newX, y: newY } } });
                                                }
                                            }
                                            else {
                                                actions.push({ type: "kill", data: { start: { x: x, y: y }, target: { x: newX, y: newY } } });
                                            }
                                        }
                                    }
                                    else {
                                        actions.push({ type: "move", data: { start: { x: x, y: y }, target: { x: newX, y: newY } } });
                                        break;
                                    }
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    actions.push({ type: "flop", data: { index: ChessUtil.posToIndex(x, y), side: chess.side, value: chess.value } });
                }
            }
        }
        return actions;
    };
    return ChessAI;
}());
__reflect(ChessAI.prototype, "ChessAI");
