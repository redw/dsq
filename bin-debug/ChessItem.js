var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChessItem = (function (_super) {
    __extends(ChessItem, _super);
    function ChessItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.side = 1;
        _this.cardValue = 0;
        _this.canFlop = false;
        _this.touchChildren = false;
        _this.skinName = AnimalIconSkin;
        return _this;
    }
    ChessItem.prototype.init = function () {
    };
    ChessItem.prototype.reset = function (options) {
        this.index = options.index;
        var row = ~~(this.index / 4);
        var col = this.index % 4;
        var point = ChessUtil.getPoint(col, row);
        this.x = point.x;
        this.y = point.y;
        this.side = options.side;
        this.canFlop = true;
        var value = this.getCardValue();
        if (value) {
            if (this.side == ChessSideEnum.self) {
                this.typeImg.source = "animal_bule_" + value + "_png";
            }
            else {
                this.typeImg.source = "animali_red_" + value + "_png";
            }
            this.animalImg.source = "animal_" + value + "_png";
        }
        this.animalImg.visible = !!value;
        this.backImg.visible = !Boolean(value);
    };
    /**
     * 翻牌
     */
    ChessItem.prototype.flop = function (cardObj) {
        if (this.canFlop) {
            this.canFlop = false;
            var value = cardObj.value;
            var side = cardObj.side;
            if (side == ChessSideEnum.self) {
                this.typeImg.source = "animal_bule_" + value + "_png";
            }
            else {
                this.typeImg.source = "animali_red_" + value + "_png";
            }
            this.animalImg.source = "animal_" + value + "_png";
            this.animalImg.visible = true;
            ClipEff.start(this.backImg, this.frontGroup, null, this.flopComplete, this);
        }
    };
    ChessItem.prototype.flopComplete = function () {
        this.canFlop = true;
        this.dispatchEventWith("flop_complete", true);
    };
    ChessItem.prototype.show = function () {
    };
    ChessItem.prototype.getCardValue = function () {
        return GameData.chess.getChessValue(this.index);
    };
    ChessItem.prototype.destory = function () {
        DisplayUtil.removeFromParent(this);
    };
    return ChessItem;
}(ExComponent));
__reflect(ChessItem.prototype, "ChessItem");
var ChessEnum = (function () {
    function ChessEnum() {
    }
    ChessEnum.elephant = 7;
    ChessEnum.tiger = 6;
    ChessEnum.wolf = 5;
    ChessEnum.dog = 4;
    ChessEnum.cat = 3;
    ChessEnum.rat = 1;
    ChessEnum.bomb = 10;
    return ChessEnum;
}());
__reflect(ChessEnum.prototype, "ChessEnum");
var ChessSideEnum;
(function (ChessSideEnum) {
    ChessSideEnum[ChessSideEnum["self"] = 1] = "self";
    ChessSideEnum[ChessSideEnum["other"] = 2] = "other";
    ChessSideEnum[ChessSideEnum["machine"] = 3] = "machine";
})(ChessSideEnum || (ChessSideEnum = {}));
