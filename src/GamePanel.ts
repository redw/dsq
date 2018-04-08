class GamePanel extends BasePanel {
    readonly sizeX = 4;
    readonly sizeY = 8;
    private chessGroup:egret.DisplayObjectContainer;

    private chessArr = [];
    private chessData:any[] = [];

    constructor() {
        super();
        this.effectType = 0;
        this.skinName = AnimalPanelSkin;
    }

    init() {
        let chessArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf,ChessEnum.wolf,
            ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
            ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];

        let chessData = this.chessData;
        chessData.length = 0;
        for (let i = 0; i < 16; i++) {
            let obj:any = {};
            obj.value = chessArr[i];
            obj.side = 1;
            chessData.push(obj);

            obj = {};
            obj.value = chessArr[i];
            obj.side = 2;
            chessData.push(obj);
        }
        ArrayUtil.shuffle(chessData);
        for (let i = 0, len = chessData.length; i < len; i++) {
            let obj = chessData[i];
            obj.index = i;
            obj.row = ~~(i / 4);
            obj.col = i % 4;
        }

        this.createCheckerboard();

    }

    // 创建棋盘
    private createCheckerboard() {
        let chessData = this.chessData;
        for (let i = 0, len = chessData.length; i < len; i++) {
            let obj = chessData[i];
            let chess = new Chess();
            chess.reset(obj);
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    }
}