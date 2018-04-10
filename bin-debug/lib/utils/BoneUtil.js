/**
 * 龙骨工具
 *
 * Created by hh on 2017/5/11.
 */
var BoneUtil;
(function (BoneUtil) {
    var pool = {};
    var bonesDataMap = {};
    var dragonFactory = new dragonBones.EgretFactory();
    function createArmature(name, complete, context) {
        var armature = createArmatureSync(name);
        if (armature) {
            complete.call(context, armature);
        }
        else {
            Game.load.loadDragonBone(name, function () {
                var armature = createArmatureSync(name);
                if (complete) {
                    complete.call(context, armature);
                }
            }, null);
        }
    }
    BoneUtil.createArmature = createArmature;
    function createArmatureSync(name) {
        var resName = "" + name;
        if (pool[resName] && pool[resName].length > 0) {
            var armature = pool[resName].pop();
            dragonBones.WorldClock.clock.add(armature);
            return armature;
        }
        else {
            var boneJson = RES.getRes(resName + "_ske_json");
            var textureData = RES.getRes(resName + "_tex_json");
            var texture = RES.getRes(resName + "_tex_png");
            if (!boneJson || !textureData || !texture) {
                return null;
            }
            else {
                if (!bonesDataMap[resName]) {
                    bonesDataMap[resName] = [];
                    boneJson.armature[0].name = name;
                    var version = boneJson.version;
                    var versions = dragonBones.DataParser["DATA_VERSIONS"];
                    if (versions && versions.indexOf(version) < 0) {
                        egret.error("dragonbones verion error:" + version);
                        boneJson.version = versions[versions.length - 1];
                    }
                    var dragonBonesData = dragonFactory.getDragonBonesData(resName);
                    if (!dragonBonesData) {
                        dragonFactory.parseDragonBonesData(boneJson);
                    }
                    dragonFactory.parseTextureAtlasData(textureData, texture, resName);
                }
                var armature = dragonFactory.buildArmature(resName);
                armature.cacheFrameRate = 30;
                dragonBones.WorldClock.clock.add(armature);
                bonesDataMap[resName].push(armature);
                return armature;
            }
        }
    }
    BoneUtil.createArmatureSync = createArmatureSync;
    function release(armature) {
        if (armature) {
            var name_1 = armature.name;
            if (!pool[name_1]) {
                pool[name_1] = [];
            }
            armature.display.scaleX = 1;
            armature.display.scaleY = 1;
            armature.display.x = 0;
            armature.display.y = 0;
            DisplayUtil.removeFromParent(armature.display);
            armature.animation.stop();
            dragonBones.WorldClock.clock.remove(armature);
            pool[name_1].push(armature);
        }
    }
    BoneUtil.release = release;
})(BoneUtil || (BoneUtil = {}));
