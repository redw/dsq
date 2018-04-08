/**
 * 龙骨工具
 *
 * Created by hh on 2017/5/11.
 */
module BoneUtil {
    let pool:any = {};
    let bonesDataMap = {};
    let dragonFactory = new dragonBones.EgretFactory();

    export function createArmature(name:string, complete:Function, context:any) {
        let armature = createArmatureSync(name);
        if (armature) {
            complete.call(context, armature);
        } else {
            Game.load.loadDragonBone(name, ()=>{
                let armature = createArmatureSync(name);
                if (complete) {
                    complete.call(context, armature);
                }
            }, null);
        }
    }

    export function createArmatureSync(name:string) {
        let resName = `${name}`;
        if (pool[resName] && pool[resName].length > 0) {
            let armature = pool[resName].pop();
            dragonBones.WorldClock.clock.add(armature);
            return armature;
        } else {
            let boneJson = RES.getRes(`${resName}_ske_json`);
            let textureData = RES.getRes(`${resName}_tex_json`);
            let texture = RES.getRes(`${resName}_tex_png`);
            if (!boneJson || !textureData || !texture) {
                return null;
            } else {
                if (!bonesDataMap[resName]) {
                    bonesDataMap[resName] = [];
                    boneJson.armature[0].name = name;
                    let version = boneJson.version;
                    let versions = dragonBones.DataParser["DATA_VERSIONS"];
                    if (versions && versions.indexOf(version) < 0) {
                        egret.error(`dragonbones verion error:${version}`);
                        boneJson.version = versions[versions.length - 1];
                    }
                    let dragonBonesData = dragonFactory.getDragonBonesData(resName);
                    if (!dragonBonesData) {
                        dragonFactory.parseDragonBonesData(boneJson);
                    }
                    dragonFactory.parseTextureAtlasData(textureData, texture, resName);
                }
                let armature = dragonFactory.buildArmature(resName);
                armature.cacheFrameRate = 30;
                dragonBones.WorldClock.clock.add(armature);
                bonesDataMap[resName].push(armature);
                return armature;
            }
        }
    }

    export function release(armature:dragonBones.Armature) {
        if (armature) {
            let name = armature.name;
            if (!pool[name]) {
                pool[name] = [];
            }
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            armature.display.x = 0;
            armature.display.y = 0;
            DisplayUtil.removeFromParent(armature.display);
            armature.animation.stop();
            dragonBones.WorldClock.clock.remove(armature);
            pool[name].push(armature);
        }
    }
}