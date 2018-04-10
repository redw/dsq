/**
 * Created by wanhong on 2018/4/7.
 */
class ChessLogic extends egret.EventDispatcher {
    private ai:ChessAI;
    readonly chessboard:{side:number,value:number,open:number, index:number}[];
    readonly row = 8;
    readonly col = 4;

    // 自已的血量
    private selfHP = 13;
    // 对方的血量
    private otherHP = 13;

    private curSide = 0;
    private otherSide = 0;

    // 自己剩下的棋子
    private selfRemainChessArr:number[];
    // 对方剩下的棋子
    private otherRemainChessArr:number[];

    constructor() {
        super();
        let len = this.row * this.col;
        this.chessboard = Array(len);
        this.selfRemainChessArr = [];
        this.otherRemainChessArr = [];
        this.ai = new ChessAI(this);
    }

    /**
     * 开始新的一盘
     */
    public start(p2p = false) {
        this.addEventListener("request_flop", this.onRequestFlop, this);

        this.chessboard.length = 0;
        this.selfRemainChessArr.length = 0;
        this.otherRemainChessArr.length = 0;
        this.selfHP = 13;
        this.otherHP = 13;

        let chessboard = this.chessboard;
        let chessTempArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf,ChessEnum.wolf,
            ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
            ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];
        this.otherSide = p2p ? ChessSideEnum.other :ChessSideEnum.machine;
        for (let i = 0, len = chessTempArr.length; i < len; i++) {
            let obj:any = {};
            obj.value = chessTempArr[i];
            this.selfRemainChessArr.push(obj.value);
            obj.open = 0;
            obj.side = ChessSideEnum.self;
            chessboard.push(obj);

            obj = {};
            obj.value = chessTempArr[i];
            this.otherRemainChessArr.push(obj.value);
            obj.open = 0;
            obj.side = this.otherSide;
            chessboard.push(obj);
        }
        ArrayUtil.shuffle(chessboard);

        // let side = ArrayUtil.getRandomItem([ChessSideEnum.self, this.otherSide]);
        let side = this.otherSide;
        let generateData = [];
        for (let i = 0, len = chessboard.length; i < len; i++) {
            chessboard[i].index = i;
            generateData.push({index:i, open:0});
        }
        this.dispatchEventWith("generate_chessboard", false, generateData);

        this.turn(side);
    }

    /**
     * 轮到某玩家出手
     * @param {number} side
     */
    private turn(side:number) {
        this.curSide = side;
        this.dispatchEventWith("turn_side", false, side);
        if (side == ChessSideEnum.machine) {
            // let waitTime = ArrayUtil.getRandomItem([2000,3000,4000]);
            let waitTime = 1000;
            egret.setTimeout(this.calc, this, waitTime);
        }
    }

    private calc() {
        let action = this.ai.calc();
        if (action.type == "move") {
            this.move(action.data.start, action.data.target);
        } else if (action.type == "kill") {
            this.move(action.data.start, action.data.target);
        } else if (action.type == "flop") {
            this.flop(action.data.index);
        } else if (action.type == "surrender") {

        }
    }

    /**
     * 移动
     * @param {{x:number; y:number}} start
     * @param {{x:number; y:number}} target
     */
    public move(start:{x:number, y:number}, target:{x:number, y:number}) {
        let startX = start.x;
        let startY = start.y;
        let targetX = target.x;
        let targetY = target.y;
        let startIndex = ChessUtil.posToIndex(startX, startY);
        let targetIndex = ChessUtil.posToIndex(targetX, targetY);
        let startObj = this.chessboard[startIndex];
        let targetObj = this.chessboard[targetIndex];
        if (!startObj) {
            console.error("系统错误");
        } else {
            if (targetObj) {
                if (startObj.side == targetObj.side) {
                    console.error("不能吃同类");
                } else if (!ChessUtil.canEat(startObj.value, targetObj.value)) {
                    console.error("不能吃");
                } else {
                    this.chessboard[targetIndex] = startObj;
                    startObj.index = targetIndex;
                    this.chessboard[startIndex] = null;

                    if (targetObj.side == ChessSideEnum.self) {
                        ArrayUtil.removeItem(this.selfRemainChessArr, targetObj.value);
                    } else {
                        ArrayUtil.removeItem(this.otherRemainChessArr, targetObj.value);
                    }

                    this.dispatchEventWith("kill_chess", false, [Util.mixin(start, {}), Util.mixin(target, {})]);
                    this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
                }
            } else {
                if (Math.abs(targetX - startX) + Math.abs(targetY - startY) != 1) {
                    console.error("不能移动");
                } else {
                    this.chessboard[targetIndex] = startObj;
                    startObj.index = targetIndex;
                    this.chessboard[startIndex] = null;
                    this.dispatchEventWith("move_chess", false, [Util.mixin(start, {}), Util.mixin(target, {})]);
                    this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
                }
            }
        }
    }

    /**
     * 翻牌
     */
    public flop(index:number) {
        let obj = this.chessboard[index];
        if (!obj || obj.open) {
            console.error(`翻牌出错了 [${index}]`);
        } else {
            obj.open = 1;
            this.dispatchEventWith("flop_chess", false, Util.mixin(obj, {}));
            this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
        }
    }

    private onRequestFlop(e:egret.Event) {
        let index = e.data;
        this.flop(index);
    }

    /**
     * 投降
     */
    public surrender() {

    }

    // 未翻开的棋子数量
    getClosedCount() {
        let count = 0;
        for (let i = 0, len = this.chessboard.length; i < len; i++) {
            let obj = this.getChess(i);
            if (obj && !obj.open) {
                count++;
            }
        }
        return count;
    }

    // 是否在范围内
    inAreaByXY(x:number, y:number) {
        return x >= 0 && x < 4 && y >= 0 && y < 8;
    }

    // 是否在范围内
    inArea(index:number) {
        return index >= 0 && index < 32;
    }

    // 获取棋盘上的棋子
    getChess(index:number) {
        return this.chessboard[index];
    }

    // 获取棋盘上的棋子
    getChessByXY(x:number, y:number) {
        let index = y * this.col + x;
        return this.getChess(index);
    }

    // 棋盘上位置是否为空
    isEmpty(index:number) {
        return this.chessboard[index] == null;
    }
}