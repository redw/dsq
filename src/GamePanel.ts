class GamePanel extends BasePanel {
    readonly sizeX = 4;
    readonly sizeY = 8;
    private chessGroup:egret.DisplayObjectContainer;

    private chessArr:ChessItem[];

    private curSide = 0;

    constructor() {
        super();
        this.effectType = 0;
        this.skinName = AnimalPanelSkin;
    }

    init() {
        this.chessArr = [];
        this.chessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.createCheckerboard();
    }

    active() {
        var side = GameData.chess.getSide();
        this.turnSide(side);
    }

    public turnSide(side:number) {
        if (this.curSide != side) {
            this.curSide = side;
            if (side == ChessSideEnum.self) {

            } else {
                let actionObj = ChessAI.analysis(GameData.chess.getChessBoard(),13, 13, ChessSideEnum.other);
            }
        }
    }

    private onTouchTap(e:egret.TouchEvent) {
        if (this.curSide == ChessSideEnum.self) {
            let card:ChessItem = e.target;
            let index = card.index;
            let value = GameData.chess.getChessValue(index);
            if (!value) {
                value = GameData.chess.getChessRealValue(index);
                // 翻开
                GameData.chess.openValue(index);
                card.once("flop_complete", this.onFlopComplete, this);
                card.flop(value);
            }
        } else if (this.curSide == ChessSideEnum.machine) {

        }
    }

    private onFlopComplete() {
        console.log("翻开完成");
    }

    // 创建棋盘
    private createCheckerboard() {
        let chessData = GameData.chess.getChessBoard();
        for (let i = 0, len = chessData.length; i < len; i++) {
            let obj = Util.mixin(chessData[i], {});
            let chess = new ChessItem();
            chess.index = i;
            let value = GameData.chess.getChessValue(i);
            chess.reset({index:i, side:obj.side, value:value});
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    }

    public destory() {

    }
}