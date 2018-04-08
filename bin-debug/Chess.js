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
var Chess = (function (_super) {
    __extends(Chess, _super);
    function Chess() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.row = 0;
        _this.col = 0;
        _this.skinName = AnimalIconSkin;
        return _this;
    }
    Chess.prototype.init = function () {
    };
    Chess.prototype.reset = function (options) {
        this.index = options.index;
        this.row = options.row;
        this.col = options.col;
        this.x = options.col * 108;
        this.y = options.row * 104;
        var value = options.value, side = options.side;
        if (side == 1) {
            this.typeImg.source = "animal_bule_" + value + "_png";
        }
        else {
            this.typeImg.source = "animali_red_" + value + "_png";
        }
        this.animalImg.source = "animal_" + value + "_png";
        if (value > 0) {
            this.backImg.visible = false;
        }
        else {
            this.backImg.visible = true;
        }
    };
    Chess.prototype.show = function () {
    };
    Chess.prototype.getCardValue = function () {
    };
    return Chess;
}(ExComponent));
__reflect(Chess.prototype, "Chess");
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
//# sourceMappingURL=Chess.js.map