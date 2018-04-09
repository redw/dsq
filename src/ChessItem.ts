class ChessItem extends ExComponent {
    private typeImg:eui.Image;
    private animalImg:eui.Image;
    private frontGroup:egret.DisplayObject;
    private backImg:eui.Image;

    public index = 0;
    public side = 1;
    public cardValue = 0;

    private canFlop = false;

    constructor() {
        super();
        this.touchChildren = false;
        this.skinName = AnimalIconSkin;
    }

    init() {

    }

    reset(options:{index:number, side:number, value:number}) {
        this.index = options.index;
        var row  = ~~(this.index / 4);
        var col = this.index % 4;
        this.x = col * 108;
        this.y = row * 104;
        this.side = options.side;

        this.canFlop = true;
        let {side, value} = options;
        this.cardValue = GameData.chess.getChessValue(this.index);
        if (value) {
            if (this.side == 1) {
                this.typeImg.source = `animal_bule_${value}_png`;
            } else {
                this.typeImg.source = `animali_red_${value}_png`;
            }
            this.animalImg.source = `animal_${value}_png`;
        }
        this.animalImg.visible = !!value;
        this.backImg.visible = !Boolean(value);
    }

    /**
     * 翻牌
     */
    flop(value:number) {
        if (this.canFlop) {
            this.cardValue = value;
            this.canFlop = false;
            this.cardValue = value;

            if (this.side == 1) {
                this.typeImg.source = `animal_bule_${value}_png`;
            } else {
                this.typeImg.source = `animali_red_${value}_png`;
            }
            this.animalImg.source = `animal_${value}_png`;
            this.animalImg.visible = true;

            ClipEff.start(this.backImg, this.frontGroup, null, this.flopComplete, this);
        }
    }

    flopComplete() {
        this.canFlop = true;
    }

    show () {

    }

    getCardValue() {

    }
}

class ChessEnum {
    public static elephant = 7;
    public static tiger = 6;
    public static wolf = 5;
    public static dog = 4;
    public static cat = 3;
    public static rat = 1;
    public static bomb = 10;
}

enum ChessSideEnum {
    self = 1,
    other,
    machine
}