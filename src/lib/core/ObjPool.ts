/**
 * 简单的对象池
 *
 * Created by hh on 2017/6/12 0012.
 */
class ObjPool {
    private list:any[];
    private funC:any;

    public constructor(funC:any, size:number=0) {
        this.funC = funC;
        this.list = [];
        if (size) {
            this.resize(size);
        }
    }

    public resize(size) {
        let list = this.list;
        while (list.length > size) {
            list.pop();
        }
        while (list.length < size) {
            list.push(this.create());
        }
        return this;
    }

    public create(...param) {
        let list = this.list;
        if (list.length ) {
            return list.pop();
        } else {
            if (param.length == 1) {
                return new this.funC(param[0]);
            } else if (param.length == 2) {
                return new this.funC(param[0], param[1]);
            } else if (param.length == 3) {
                return new this.funC(param[0], param[1], param[2]);
            } else if (param.length == 4) {
                return new this.funC(param[0], param[1], param[2], param[3]);
            }
            return new this.funC();
        }
    }

    public release(value:any) {
        if (value) {
            if (value.release) {
                value.release();
            }
            this.list.push(value);
        }
        return value;
    }
}
