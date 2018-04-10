class GamePanel extends BasePanel {
    private blueGroup:eui.Group;
    private redGroup:eui.Group;

    private chessGroup:egret.DisplayObjectContainer;
    private chessArr:ChessItem[];
    private logic:ChessLogic;
    private curSide = 0;


    constructor() {
        super();
        this.effectType = 0;
        this.skinName = AnimalPanelSkin;
        this.chessArr = [];
    }

    init() {
        this.logic = new ChessLogic();
        this.logic.addEventListener("move_chess", this.onMoveChess, this);
        this.logic.addEventListener("kill_chess", this.onKillChess, this);
        this.logic.addEventListener("flop_chess", this.onFlopChess, this);
        this.logic.addEventListener("turn_side", this.onTurnSide, this);
        this.logic.addEventListener("generate_chessboard", this.onGenerateChessBoard, this);
        this.logic.start();
    }

    public addToStage() {
        this.chessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }

    // 生成棋盘数据
    private onGenerateChessBoard(e:egret.Event) {
        console.log("事件-生成棋盘");
        let data:{index:number, open:number,side:number,value:number}[] = e.data;
        GameData.chess.setChessBoard(data);
        this.createCheckerboard();
    }

    // 轮到某人
    private onTurnSide(e:egret.Event) {
        let side = e.data;
        console.log("事件-轮到某方", side);
        GameData.chess.turnSide(side);
        let selfArrow = DisplayUtil.getChildByName(this.blueGroup, "arrowImg");
        let otherArrow = DisplayUtil.getChildByName(this.redGroup, "arrowImg");
        if (side == ChessSideEnum.self) {
            selfArrow.visible = true;
            otherArrow.visible = false;
        } else {
            selfArrow.visible = false;
            otherArrow.visible = true;
        }
    }

    // 移动棋子
    private onMoveChess(e:egret.Event) {

    }

    // 吃棋子
    private onKillChess(e:egret.Event) {

    }

    // 翻棋子
    private onFlopChess(e:egret.Event) {
        let data = e.data;
        let index = data.index;
        console.log("事件-翻牌");
        GameData.chess.openValue(index, data.value);
        let chess:ChessItem = this.chessArr[index];
        chess.flop(data.value);
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
                // let actionObj = ChessAI.analysis(GameData.chess.getChessBoard(),13, 13, ChessSideEnum.other);
            }
        }
    }

    private onTouchTap(e:egret.TouchEvent) {
        if (GameData.chess.getSide() == ChessSideEnum.self) {
            let card:ChessItem = e.target;
            let index = card.index;
            let chessObj = GameData.chess.getChess(index);
            if (chessObj) {
                if (chessObj.open) {
                    this.showTip();
                } else {
                    this.logic.dispatchEventWith("request_flop", false,  index);
                }
            } else {
                console.error("系统出错");
            }
        } else {
            Notice.show("当前没轮到自己");
        }
    }

    private showTip() {
        console.log("显示提示");
    }

    // 创建棋盘
    private createCheckerboard() {
        this.chessArr.length = 0;
        let chessData = GameData.chess.getChessBoard();
        for (let i = 0, len = chessData.length; i < len; i++) {
            let chess = new ChessItem();
            chess.index = i;
            let value = GameData.chess.getChess(i);
            chess.reset(value);
            this.chessArr.push(chess);
            this.chessGroup.addChild(chess);
        }
    }

    private onFlopComplete() {
        console.log("翻开完成");
    }

    public destory() {

    }
}