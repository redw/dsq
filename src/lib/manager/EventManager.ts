class EventManager extends egret.EventDispatcher
{
	public constructor() 
	{
		super();
	}
	public eventDisPatcher:egret.EventDispatcher = new egret.EventDispatcher();


	 public  dispatch(cmd:string, data:any) 
	 {
        this.eventDisPatcher.dispatchEventWith(cmd, false, data);
    }

    public  has(cmd:string):boolean {
        return this.eventDisPatcher.hasEventListener(cmd);
    }

    public  once(cmd:string, cb:Function, cbObj) {
        this.eventDisPatcher.once(cmd, cb, cbObj);
    }

    public  on(cmd:string, cb:Function, cbObj:any):void {
       this.eventDisPatcher.addEventListener(cmd, cb, cbObj);
    }

    public  off(cmd:string, cb:Function, cbObj:any):void {
        this.eventDisPatcher.removeEventListener(cmd, cb, cbObj);
    }
}