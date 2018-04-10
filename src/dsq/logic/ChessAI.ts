class ChessAI {
    readonly chessboard;

    constructor(readonly logic:ChessLogic) {
        this.chessboard = logic.chessboard;
    }

    // 得到未翻开棋子的数量
    private getClosedCount() {

    }

    calc() {
        let actions:{type:string, data:any}[] = this.getAllAction(this.chessboard);
        let action = actions.shift();
        console.log("翻牌行为:",action);
        return action;
    }

    // 得到所有的动作
    private getAllAction(chessArray:{value:number,side:number, index:number, open:number}[]) {
        let actions:{type:string, data:any}[] = [];
        let dir = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        for (let i = 0, len = chessArray.length; i < len; i++) {
            let y = ~~(i / 4);
            let x = i % 4;
            let chess = chessArray[i];
            if (chess) {
                if (chess.open) {
                    let checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                    for (let d = 0; d < dir.length; d++) {
                        for (let n = 1; n <= checkCount; n++) {
                            var newX = x + dir[d].x * n;
                            var newY = y + dir[d].y * n;
                            if (this.logic.inAreaByXY(newX, newY)) {
                                let targetChess = this.logic.getChessByXY(newX, newY);
                                if (targetChess) {
                                    if (targetChess.open &&
                                        chess.side != targetChess.side &&
                                        ChessUtil.canEat(chess.value, targetChess.value)) {
                                        actions.push({type:"kill", data:{start:{x:x, y:y}, target:{x:newX, y:newY}}});
                                    }
                                } else {
                                    actions.push({type:"move", data:{start:{x:x, y:y}, target:{x:newX, y:newY}}});
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                } else {
                    actions.push({type:"flop", data:{index:ChessUtil.posToIndex(x, y), side:chess.side, value:chess.value}});
                }
            }
        }
        return actions

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
    }
}