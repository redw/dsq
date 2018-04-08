/**
 * 游戏中通用的component
 *
 * -添加了对象的生命周期
 * -添加了点击事件
 * -添加了舞台事件
 *
 * Created by hh on 2017/10/10 0010.
 */
class ExComponent extends eui.Component implements ILifeCycle {
    protected _dataOk = false;
    protected _viewOk = false;
    protected _data:any;
    private preScaleX = 1;
    private preScaleY = 1;

    constructor(data?:any) {
        super();
        if (data !== undefined) {
            this.setData(data);
        }
    }

    public fit(baseWidth = 1280, baseHeight = 720) {
        let s1 = baseWidth / baseHeight;
        let s2 = Game.stage.stageWidth / Game.stage.stageHeight;
        let s = 1;
        if (s2 > s1) {
            s = Game.stage.stageHeight / baseHeight;
        } else {
            s = Game.stage.stageWidth / baseWidth;
        }
        this.preScaleX = s;
        this.preScaleY = s;
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
        this.init();
        this._viewOk = true;
        if (this._dataOk) {
            this.active();
        }
    }

    $onAddToStage(stage:egret.Stage, nestLevel:number) {
        super.$onAddToStage(stage, nestLevel);
        this.addToStage();
    }

    protected $onClick(e:egret.TouchEvent) {
        this.onClick(e.target.name, e);
    }

    /**
     * 点击事件
     * @param name
     */
    protected onClick(name:string, e:egret.TouchEvent) {

    }

    public setData(data:any) {
        this._data = data;
        this._dataOk = true;
        if (this._viewOk) {
            this.active();
        }
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public get data() {
        return this._data;
    }

    /**
     * 界面初始化完成
     */
    public init() {

    }

    /**
     * 对象激活
     */
    public active() {

    }

    /**
     * 添加到舞台
     */
    public addToStage() {

    }

    /**
     * 从舞台上移除
     */
    public removeFromStage() {

    }

    /**
     * 对象失眠
     */
    public sleep() {

    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.removeFromStage();
    }

    /**
     * 释放
     */
    public dispose() {
        this._data = null;
        this.sleep();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}