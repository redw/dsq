/**
 * 游戏中弹出面板
 *
 * Created by hh on 2017/10/19 0010.
 */
class BasePanel extends ExComponent {
    /** 层级 */
    public layer = "layer";

    /** 灰底 */
    public modal = 1;

    /** 灰底ALPHA */
    public modalAlpha = 0.6;

    /** 存在模式 0:永远存在 1:关闭即销毁 */
    public autoDispose = 0;

    /** 打开特效 0:没有动画 1:中间弹出 2:上进 3:下进 4:左进 5:右进 */
    public effectType = 0;

    /**
     *
     * @param data
     * @param option
     */
    public constructor(data?:any, option?:{
        effectType?:number,
        layer?:number,
        autoDispose?:number,
        modal?:number,
        modalAlpha?:number})
    {
        super(data);
        this.effectType = Util.getPropValue(option, "effectType", 1);
        this.layer = Util.getPropValue(option, "layer", PanelLayer.TOP_LAYER);
        this.autoDispose = Util.getPropValue(option, "autoDispose", 0);
        this.modal = Util.getPropValue(option, "modal", 1);
        this.modalAlpha = Util.getPropValue(option, "modalAlpha", 0.6)
    }

    protected $onClick(e:egret.TouchEvent) {
        let name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Game.closePanel(this);
        } else {
            this.onClick(name, e);
        }
    }
}