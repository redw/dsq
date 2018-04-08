/**
 * Created by wanhong on 2018/4/7.
 */
class ChessAI {
    /**
     * 能否吃
     * @param attack
     * @param attacked
     */
    public static canEat(attack:number, attacked:number) {
        // 如果攻击者是炮弹,则都可打
        if (attack == ChessEnum.bomb) {
            return true;
        }

        // 如果攻击者是大象
        if (attack == ChessEnum.elephant) {
            if (attacked == ChessEnum.rat) {
                return false;
            } else {
                return true;
            }
        }

        // 如果攻击者是老鼠
        if (attack == ChessEnum.rat) {
            if (attacked == ChessEnum.rat || attacked == ChessEnum.elephant) {
                return true;
            } else {
                return false;
            }
        }

        return attack <= attacked;
    }

    public static analysis(chessArray:{value:number,side:number, index:number}[][], hp1:number, hp2:number, side = 1) {
        let row = chessArray.length;
        var col = chessArray[0].length;
        let actions:any[][] = [];
        let dir = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let chess = chessArray[i][j];
                let checkCount = chess.value == ChessEnum.bomb ? 100 : 1;
                actions[chess.index] = [];
                for (let k = 0; k < 4; k++) {
                    for (let m = 0; m < checkCount; m++) {
                        let i1 = i + dir[k].y * m;
                        let j1 = i + dir[k].x * m;
                        if (i1 >= 0 && i1 <= row && j1 >= 0 && j1 <= col) {
                            let chess1 = chessArray[i1][j1];
                            if (chess1) {
                                if (ChessAI.canEat(chess.value, chess1.value)) {
                                    actions[chess.index].push("kill", {y:i1, x:j1});
                                }
                            } else {
                                actions[chess.index].push("move", {y:i1, x:j1});
                                break;
                            }
                        } else {
                            break;
                        }
                    }
                }

                // 如果是炮弹
                if (chess.value == ChessEnum.bomb) {
                    let newActions = [];
                    for (let n = 0; n < actions[chess.index].length; n++) {
                        if (actions[chess.index].length >= 2) {
                            newActions.push(actions[chess.index][1]);
                        }
                    }
                    actions[chess.index] = newActions;
                }
            }
        }
    }
}