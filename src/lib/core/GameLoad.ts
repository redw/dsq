module HH {
    export class GameLoad{
        private uid =  0;
        private waitList;

        public constructor(option?:any) {
            this.waitList = [];
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.groupLoadComplete, this);
        }

        private groupLoadComplete(e:RES.ResourceEvent) {
            let name = e.groupName;
            this.doLoadComplete(name);
        }

        private doLoadComplete(name:string, data?:any) {
            let len = this.waitList.length;
            for (let i = 0; i < len; i+= 3) {
                if (this.waitList[i] == name) {
                    let fun = this.waitList[i + 1];
                    let scope = this.waitList[i + 2];
                    fun.call(scope, data, name);
                    this.waitList.splice(i, 3);
                    break;
                }
            }
        }

        /**
         * 加载group资源
         * @param urlList
         * @param completeCb
         * @param progressCb
         * @param context
         * @param name
         * @param property
         * @aliasName
         * @
         */
        public loadGroup(urlList:any[], completeCb:Function, context:any, name?:string,  property?:number) {
            this.uid++;
            if (!name) {
                name = `group_#_${this.uid}`;
            }
            if (name == "preload") {
                for (let i = 0, len = urlList.length; i < len; i++) {
                    urlList[i].url += "?+" + Math.random();
                }
                this.waitList.push(name, completeCb, context);
                RES.loadGroup("preload");
            } else {
                this.waitList.push(name, completeCb, context);
                RES.createGroup(name, urlList);
                RES.loadGroup(name, property);
            }
        }

        public loadConfigGroup(group:{url:string}[], back:any, context:any, name:string) {
            let len = group ? group.length : 0;
            let list:string[] = [];
            for (let i = 0; i < len; i++) {
                list.push(group[i].url);
            }
            this.loadGroup(list, back, context, name);
        }

        /**
         * 加载dragonBone资源
         * @param name
         * @param back
         * @param cb
         * @param cbThis
         */
        public loadDragonBone(name:string, cb:Function, cbObj:any, property?:number) {
            let res = [];
            res.push(`${name}_ske_json`);
            res.push(`${name}_tex_json`);
            res.push(`${name}_tex_png`);
            this.loadGroup(res, cb, cbObj, name, property);
        }

        public loadMC(name:string, cb:Function, cbObj:any, property?:number) {
            let res = [];
            res.push(`${name}_json`);
            res.push(`${name}_png`);
            this.loadGroup(res, cb, cbObj, name, property);
        }

        /**
         * 加载list
         * @param urlList
         * @param compFunc
         * @param progFunc
         * @param thisObject
         */
        public loadList(urlList:string[], compFunc:any, progFunc:any, thisObject:any):void {
            let resList:Object = {};
            let urlLen:number = urlList.length;
            function next():void {
                let url:string = urlList.shift();
                RES.getResByUrl(url, function(res: any):void {
                    resList[url] = res;
                    if (progFunc) {
                        progFunc.call(thisObject, (urlLen - urlList.length) / urlLen);
                    }
                    if (urlList.length <= 0) {
                        compFunc.call(thisObject, resList);
                    } else {
                        next();
                    }
                }, this);
            }
            next();
        }
    }
}
