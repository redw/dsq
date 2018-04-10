var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessAI = (function () {
    function ChessAI(logic) {
        this.logic = logic;
        this.chessboard = logic.chessboard;
    }
    // 得到未翻开棋子的数量
    ChessAI.prototype.getClosedCount = function () {
    };
    ChessAI.prototype.calc = function () {
        var actions = this.getAllAction(this.chessboard);
        return actions.shift();
    };
    // 得到所有的动作
    ChessAI.prototype.getAllAction = function (chessArray) {
        var actions = [];
        var dir = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        for (var i = 0, len = chessArray.length; i < len; i++) {
            var y = ~~(i / 4);
            var x = i % 4;
            var chess = chessArray[i];
            if (chess) {
                if (chess.open) {
                    var checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                    for (var d = 0; d < dir.length; d++) {
                        for (var n = 1; n <= checkCount; n++) {
                            var newX = x + dir[d].x * n;
                            var newY = y + dir[d].y * n;
                            if (this.logic.inAreaByXY(newX, newY)) {
                                var targetChess = this.logic.getChessByXY(newX, newY);
                                if (targetChess) {
                                    if (targetChess.open &&
                                        chess.side != targetChess.side &&
                                        ChessUtil.canEat(chess.value, targetChess.value)) {
                                        actions.push({ type: "kill", data: { start: { x: x, y: y }, target: { x: newX, y: newY } } });
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
                else {
                    actions.push({ type: "flop", data: { index: ChessUtil.posToIndex(x, y) } });
                }
            }
        }
        return actions;
        // let row = chessArray.length;
        // var col = chessArray[0].length;
        // let actions:any[][] = [];
        // let dir = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        // for (let i = 0; i < row; i++) {
        //     for (let j = 0; j < col; j++) {
        //         let chess = chessArray[i][j];
        //         let checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
        //         actions[chess.index] = [];
        //         for (let k = 0; k < 4; k++) {
        //             for (let m = 0; m < checkCount; m++) {
        //                 let i1 = i + dir[k].y * m;
        //                 let j1 = i + dir[k].x * m;
        //                 if (i1 >= 0 && i1 <= row && j1 >= 0 && j1 <= col) {
        //                     let chess1 = chessArray[i1][j1];
        //                     if (chess1) {
        //                         if (ChessAI.canEat(chess.value, chess1.value)) {
        //                             actions[chess.index].push("kill", {y:i1, x:j1});
        //                         }
        //                     } else {
        //                         actions[chess.index].push("move", {y:i1, x:j1});
        //                         break;
        //                     }
        //                 } else {
        //                     break;
        //                 }
        //             }
        //         }
        //
        //         // 如果是炮弹
        //         if (chess.value == ChessEnum.bomb) {
        //             let newActions = [];
        //             for (let n = 0; n < actions[chess.index].length; n++) {
        //                 if (actions[chess.index].length >= 2) {
        //                     newActions.push(actions[chess.index][1]);
        //                 }
        //             }
        //             actions[chess.index] = newActions;
        //         }
        //     }
        // }
        //
        // // 评估行为
        // let action:any;
        // if (!actions.length) {
        //     let obj = ChessAI.flop(chessArray);
        //     action = {};
        //     action.type = "flop";
        // } else {
        //     action = actions.shift();
        // }
        // return action;
    };
    return ChessAI;
}());
__reflect(ChessAI.prototype, "ChessAI");
//# sourceMappingURL=ChessAI.js.map