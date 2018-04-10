class ChessAI {
    readonly chessboard;

    constructor(readonly logic:ChessLogic) {
        this.chessboard = logic.chessboard;
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
            let x = i % 4;
            let y = ~~(i / 4);
            let chess = chessArray[i];
            if (chess) {
                if (chess.open) {
                    if (chess.side == ChessSideEnum.machine) {
                        let checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                        for (let d = 0; d < dir.length; d++) {
                            let count = 0;
                            for (let n = 1; n <= checkCount; n++) {
                                var newX = x + dir[d].x * n;
                                var newY = y + dir[d].y * n;
                                if (this.logic.inAreaByXY(newX, newY)) {
                                    let targetChess = this.logic.getChessByXY(newX, newY);
                                    if (targetChess) {
                                        if (chess.value == ChessEnum.bomb) {
                                            count++;
                                        }
                                        if (targetChess.open &&
                                            chess.side != targetChess.side &&
                                            ChessUtil.canEat(chess.value, targetChess.value)) {
                                            if (chess.value == ChessEnum.bomb) {
                                                if (count == 2) {
                                                    actions.push({type:"kill", data:{start:{x:x, y:y}, target:{x:newX, y:newY}}});
                                                }
                                            } else {
                                                actions.push({type:"kill", data:{start:{x:x, y:y}, target:{x:newX, y:newY}}});
                                            }
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
                    }
                } else {
                    actions.push({type:"flop", data:{index:ChessUtil.posToIndex(x, y), side:chess.side, value:chess.value}});
                }
            }
        }
        return actions
    }
}