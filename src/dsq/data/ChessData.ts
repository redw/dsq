/**
 * Created by wanhong on 2018/4/9.
 */
class ChessData {
    private _data:any;
    selfLastTime = 0;
    otherLastTime = 0;

    private side = 0;
    private chessboard:{open:number,value:number,side:number,index:number}[];

    constructor () {
        let data = ExternalUtil.getItem("chess_token");
        if (data) {
            data = JSON.parse(data);
            this._data = data;
        } else {
            let open = [];
            let chessboard = [];

            let chessArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf,ChessEnum.wolf,
                ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
                ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];

            for (let i = 0; i < 16; i++) {
                let obj:any = {};
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

            let side = ArrayUtil.removeRandomItem([ChessSideEnum.self, ChessSideEnum.machine]);
            this._data = {side:side, selfHP:13, otherHP:13, lastTime:0, chessboard:chessboard};
        }
    }

    setChessBoard(chessboard:{open:number,value:number,side:number,index:number}[]) {
        this.chessboard = chessboard;
    }

    moveChess(startIndex:number, targetIndex:number) {
        let startObj = this.chessboard[startIndex];
        let targetObj = this.chessboard[targetIndex];
        this.chessboard[targetIndex] = startObj;
        if (startObj) {
            startObj.index = targetIndex;
        }
        this.chessboard[startIndex] = targetObj;
        if (targetObj) {
            targetObj.index = startIndex;
        }
    }

    killChess(index:number) {
        if (this.chessboard[index]) {
            this.chessboard[index] = null;
        }
    }

    turnSide(side:number) {
        this.side = side;
    }

    // 得到棋盘的值 -1 空 0翻开
    getChessValue(index:number) {
        let chessboard = this._data.chessboard;
        let value =  chessboard[index] ? (chessboard[index].open ? chessboard[index].value : 0) : -1;
        return Number(value);
    }

    // 翻开棋盘
    openValue(cardObj:any) {
        let chessboard = this._data.chessboard;
        let index = cardObj.index;
        let obj = chessboard[index];
        if (obj) {
            obj.open = 1;
            obj.value = cardObj.value;
            obj.side = cardObj.side;
        } else {

        }
    }

    setChessValue(index:number, value:number) {
        let chessboard = this._data.chessboard;
        let obj = chessboard[index];
        if (obj) {
            obj.value = value;
        }
    }

    getChessRealValue(index:number) {
        let chessboard = this._data.chessboard;
        return chessboard[index].value;
    }

    clearCache() {
        ExternalUtil.setItem("chess_token", "");
    }

    getChess(index:number) {
        return this.chessboard[index];
    }

    // 棋盘数据
    getChessBoard() {
        return this.chessboard;
    }

    // 当前谁出手
    getSide() {
        return this.side;
    }
}