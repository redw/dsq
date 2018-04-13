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
/**
 * Created by wanhong on 2018/4/7.
 */
var ChessLogic = (function (_super) {
    __extends(ChessLogic, _super);
    function ChessLogic() {
        var _this = _super.call(this) || this;
        _this.row = 8;
        _this.col = 4;
        // 自已的血量
        _this.selfHP = 13;
        // 对方的血量
        _this.otherHP = 13;
        _this.curSide = 0;
        _this.otherSide = 0;
        var len = _this.row * _this.col;
        _this.chessboard = Array(len);
        _this.selfRemainChessArr = [];
        _this.otherRemainChessArr = [];
        _this.ai = new ChessAI(_this);
        return _this;
    }
    /**
     * 开始新的一盘
     */
    ChessLogic.prototype.start = function (p2p) {
        if (p2p === void 0) { p2p = false; }
        this.addEventListener("request_flop", this.onRequestFlop, this);
        this.chessboard.length = 0;
        this.selfRemainChessArr.length = 0;
        this.otherRemainChessArr.length = 0;
        this.selfHP = 13;
        this.otherHP = 13;
        var chessboard = this.chessboard;
        var chessTempArr = [ChessEnum.elephant, ChessEnum.tiger, ChessEnum.tiger, ChessEnum.wolf, ChessEnum.wolf, ChessEnum.wolf,
            ChessEnum.dog, ChessEnum.dog, ChessEnum.cat, ChessEnum.cat, ChessEnum.rat, ChessEnum.rat,
            ChessEnum.rat, ChessEnum.rat, ChessEnum.bomb, ChessEnum.bomb];
        this.otherSide = p2p ? ChessSideEnum.other : ChessSideEnum.machine;
        for (var i = 0, len = chessTempArr.length; i < len; i++) {
            var obj = {};
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
        var side = this.otherSide;
        var generateData = [];
        for (var i = 0, len = chessboard.length; i < len; i++) {
            chessboard[i].index = i;
            generateData.push({ index: i, open: 0 });
        }
        this.dispatchEventWith("generate_chessboard", false, generateData);
        this.turn(side);
    };
    /**
     * 轮到某玩家出手
     * @param {number} side
     */
    ChessLogic.prototype.turn = function (side) {
        this.curSide = side;
        this.dispatchEventWith("turn_side", false, side);
        if (side == ChessSideEnum.machine) {
            // let waitTime = ArrayUtil.getRandomItem([2000,3000,4000]);
            var waitTime = 1000;
            egret.setTimeout(this.calc, this, waitTime);
        }
    };
    ChessLogic.prototype.calc = function () {
        var action = this.ai.calc();
        if (action.type == "move") {
            this.move(action.data.start, action.data.target);
        }
        else if (action.type == "kill") {
            this.move(action.data.start, action.data.target);
        }
        else if (action.type == "flop") {
            this.flop(action.data.index);
        }
        else if (action.type == "surrender") {
        }
    };
    /**
     * 移动
     * @param {{x:number; y:number}} start
     * @param {{x:number; y:number}} target
     */
    ChessLogic.prototype.move = function (start, target) {
        var startX = start.x;
        var startY = start.y;
        var targetX = target.x;
        var targetY = target.y;
        var startIndex = ChessUtil.posToIndex(startX, startY);
        var targetIndex = ChessUtil.posToIndex(targetX, targetY);
        var startObj = this.chessboard[startIndex];
        var targetObj = this.chessboard[targetIndex];
        if (!startObj) {
            console.error("系统错误");
        }
        else {
            if (targetObj) {
                if (startObj.side == targetObj.side) {
                    console.error("不能吃同类");
                }
                else if (!ChessUtil.canEat(startObj.value, targetObj.value)) {
                    console.error("不能吃");
                }
                else {
                    this.chessboard[targetIndex] = startObj;
                    this.chessboard[startIndex] = null;
                    if (targetObj.side == ChessSideEnum.self) {
                        ArrayUtil.removeItem(this.selfRemainChessArr, targetObj.value);
                    }
                    else {
                        ArrayUtil.removeItem(this.otherRemainChessArr, targetObj.value);
                    }
                    this.dispatchEventWith("kill_chess", false, [Util.mixin(start, {}), Util.mixin(target, {})]);
                    this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
                }
            }
            else {
                if (Math.abs(targetX - startX) + Math.abs(targetY - startY) != 1) {
                    console.error("不能移动");
                }
                else {
                    this.chessboard[targetIndex] = startObj;
                    this.chessboard[startIndex] = null;
                    this.dispatchEventWith("move_chess", false, [Util.mixin(start, {}), Util.mixin(target, {})]);
                    this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
                }
            }
        }
    };
    /**
     * 翻牌
     */
    ChessLogic.prototype.flop = function (index) {
        var obj = this.chessboard[index];
        if (!obj || obj.open) {
            console.error("\u7FFB\u724C\u51FA\u9519\u4E86 [" + index + "]");
        }
        else {
            obj.open = 1;
            this.dispatchEventWith("flop_chess", false, Util.mixin(obj, {}));
            this.turn(this.curSide == ChessSideEnum.self ? this.otherSide : ChessSideEnum.self);
        }
    };
    ChessLogic.prototype.onRequestFlop = function (e) {
        var index = e.data;
        this.flop(index);
    };
    /**
     * 投降
     */
    ChessLogic.prototype.surrender = function () {
    };
    // 未翻开的棋子数量
    ChessLogic.prototype.getClosedCount = function () {
        var count = 0;
        for (var i = 0, len = this.chessboard.length; i < len; i++) {
            var obj = this.getChess(i);
            if (obj && !obj.open) {
                count++;
            }
        }
        return count;
    };
    // 是否在范围内
    ChessLogic.prototype.inAreaByXY = function (x, y) {
        return x >= 0 && x < 4 && y >= 0 && y < 8;
    };
    // 是否在范围内
    ChessLogic.prototype.inArea = function (index) {
        return index >= 0 && index < 32;
    };
    // 获取棋盘上的棋子
    ChessLogic.prototype.getChess = function (index) {
        return this.chessboard[index];
    };
    // 获取棋盘上的棋子
    ChessLogic.prototype.getChessByXY = function (x, y) {
        var index = y * this.col + x;
        return this.getChess(index);
    };
    // 棋盘上位置是否为空
    ChessLogic.prototype.isEmpty = function (index) {
        return this.chessboard[index] == null;
    };
    return ChessLogic;
}(egret.EventDispatcher));
__reflect(ChessLogic.prototype, "ChessLogic");
