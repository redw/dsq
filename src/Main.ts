class Main extends egret.DisplayObject{
    public constructor() {
        super();
        if (this.stage) {
            this.addToStage();
        } else {
            this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this)
        }
    }

    private addToStage() {
        Game.init(this.stage, {});
        GameData.boot();

        Game.on(GameEvent.PREPARE_COMPLETE, this.startGame, this);
        Game.start();
    }

    private startGame() {
        Game.playMusic("bgm_huoguo_mp3");
        Game.openPanel(GamePanel);
    }
}
