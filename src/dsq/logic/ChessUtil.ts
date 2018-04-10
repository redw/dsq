class ChessUtil {
    public static indexToPos(index:number) {
        let pos = {x:0, y:0};
        pos.x = index % 4;
        pos.y = ~~(index / 4);
        return pos;
    }

    public static posToIndex(x:number, y:number) {
        let index = y * 4 + x;
        return index;
    }

    /**
     * 能否吃
     * @param attack
     * @param attacked
     */
    public static canEat(attack:number, attacked:number) {
        // 如果攻击者是炮弹,则都可打
        if (attack == ChessEnum.bomb) {
            return true;
        }

        // 如果攻击者是大象
        if (attack == ChessEnum.elephant) {
            if (attacked == ChessEnum.rat) {
                return false;
            } else {
                return true;
            }
        }

        // 如果攻击者是老鼠
        if (attack == ChessEnum.rat) {
            if (attacked == ChessEnum.rat || attacked == ChessEnum.elephant) {
                return true;
            } else {
                return false;
            }
        }

        return attack <= attacked;
    }
}