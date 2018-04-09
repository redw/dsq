/**
 * Created by wanhong on 2018/4/9.
 */
class GameData {
    public static chess:ChessData;

    public static boot() {
        GameData.chess = new ChessData();
    }
}