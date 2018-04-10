var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessUtil = (function () {
    function ChessUtil() {
    }
    ChessUtil.indexToPos = function (index) {
        var pos = { x: 0, y: 0 };
        pos.x = index % 4;
        pos.y = ~~(index / 4);
        return pos;
    };
    ChessUtil.posToIndex = function (x, y) {
        var index = y * 4 + x;
        return index;
    };
    ChessUtil.getPoint = function (x, y) {
        var point = { x: x * 108, y: y * 104 };
        return point;
    };
    /**
     * 能否吃
     * @param attack
     * @param attacked
     */
    ChessUtil.canEat = function (attack, attacked) {
        // 如果攻击者是炮弹,则都可打
        if (attack == ChessEnum.bomb) {
            return true;
        }
        // 如果攻击者是大象
        if (attack == ChessEnum.elephant) {
            if (attacked == ChessEnum.rat) {
                return false;
            }
            else {
                return true;
            }
        }
        // 如果攻击者是老鼠
        if (attack == ChessEnum.rat) {
            if (attacked == ChessEnum.rat || attacked == ChessEnum.elephant) {
                return true;
            }
            else {
                return false;
            }
        }
        return attack >= attacked;
    };
    return ChessUtil;
}());
__reflect(ChessUtil.prototype, "ChessUtil");
