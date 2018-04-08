var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wanhong on 2018/4/7.
 */
var ChessAI = (function () {
    function ChessAI() {
    }
    /**
     * 能否吃
     * @param attack
     * @param attacked
     */
    ChessAI.canEat = function (attack, attacked) {
        // 如果攻击者是炮弹,则都可打
        if (attack == ChessEnum.bomb) {
            return true;
        }
        // 如果攻击者是大象
        if (attack == ChessEnum.elephant) {
            if (attacked == ChessEnum.rat) {
                return false;
            }
            else {
                return true;
            }
        }
        // 如果攻击者是老鼠
        if (attack == ChessEnum.rat) {
            if (attacked == ChessEnum.rat || attacked == ChessEnum.elephant) {
                return true;
            }
            else {
                return false;
            }
        }
        return attack <= attacked;
    };
    ChessAI.analysis = function (chessArray, hp1, hp2, side) {
        if (side === void 0) { side = 1; }
        var row = chessArray.length;
        var col = chessArray[0].length;
        var actions = [];
        var dir = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var chess = chessArray[i][j];
                var checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                actions[chess.index] = [];
                for (var k = 0; k < 4; k++) {
                    for (var m = 0; m < checkCount; m++) {
                        var i1 = i + dir[k].y * m;
                        var j1 = i + dir[k].x * m;
                        if (i1 >= 0 && i1 <= row && j1 >= 0 && j1 <= col) {
                            var chess1 = chessArray[i1][j1];
                            if (chess1) {
                                if (ChessAI.canEat(chess.value, chess1.value)) {
                                    actions[chess.index].push("kill", { y: i1, x: j1 });
                                }
                            }
                            else {
                                actions[chess.index].push("move", { y: i1, x: j1 });
                                break;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                // 如果是炮弹
                if (chess.value == ChessEnum.bomb) {
                    var newActions = [];
                    for (var n = 0; n < actions[chess.index].length; n++) {
                        if (actions[chess.index].length >= 2) {
                            newActions.push(actions[chess.index][1]);
                        }
                    }
                    actions[chess.index] = newActions;
                }
            }
        }
    };
    return ChessAI;
}());
__reflect(ChessAI.prototype, "ChessAI");
//# sourceMappingURL=ChessAI.js.map