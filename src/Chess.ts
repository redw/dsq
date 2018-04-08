class Chess extends ExComponent {
    private index = 0;
    private row = 0;
    private col = 0;

    private typeImg:eui.Image;
    private animalImg:eui.Image;
    private backImg:eui.Image;

    constructor() {
        super();
        this.skinName = AnimalIconSkin;
    }

    init() {

    }

    reset(options:{row:number, col:number, index:number, side:number, value:number}) {
        this.index = options.index;
        this.row = options.row;
        this.col = options.col;
        this.x = options.col * 108;
        this.y = options.row * 104;
        let {value, side} = options;
        if (side == 1) {
            this.typeImg.source = `animal_bule_${value}_png`;
        } else {
            this.typeImg.source = `animali_red_${value}_png`;
        }

        this.animalImg.source = `animal_${value}_png`;
        if (value > 0) {
            this.backImg.visible = false;
        } else {
            this.backImg.visible = true;
        }
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