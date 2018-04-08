var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HH;
(function (HH) {
    var GameSound = (function () {
        function GameSound(game) {
            var _this = this;
            this._soundState = true;
            this._musicState = true;
            this.activate = true;
            this.stage = game.stage;
            // if (!ExternalUtil.isIOS()) {
            this.stage.addEventListener(egret.Event.DEACTIVATE, function () {
                _this.activate = false;
                _this.checkPlayMusic();
                _this.checkPlaySound();
            }, this);
            this.stage.addEventListener(egret.Event.ACTIVATE, function () {
                _this.activate = true;
                _this.checkPlayMusic();
                _this.checkPlaySound();
            }, this);
            // }
            this.soundCompList = [];
            this.freeList = [];
            this.playingList = [];
            this.musicComp = null;
        }
        /**
         * 播放音乐
         * @param url
         */
        GameSound.prototype.playMusic = function (url) {
            this.play(url, 0);
        };
        /**
         * 播音效
         * @param url
         */
        GameSound.prototype.playSound = function (url) {
            this.play(url, 1);
        };
        GameSound.prototype.play = function (url, loops) {
            var isSound = Boolean(loops);
            if (isSound) {
                var soundComp = this.freeList.pop();
                if (!soundComp) {
                    soundComp = new SoundComp(loops);
                }
                this.playingList.push(soundComp);
                soundComp.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
                soundComp.play(url);
            }
            else {
                if (!this.musicComp) {
                    this.musicComp = new SoundComp(loops);
                }
                this.musicComp.play(url);
            }
        };
        GameSound.prototype.playComplete = function (e) {
            var soundComp = e.target;
            if (soundComp.isSound) {
                ArrayUtil.removeItem(this.playingList, soundComp);
            }
            soundComp.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            this.freeList.push(soundComp);
        };
        Object.defineProperty(GameSound.prototype, "soundState", {
            get: function () {
                return this._soundState;
            },
            set: function (value) {
                if (this._soundState != value) {
                    this._soundState = value;
                    this.checkPlaySound();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameSound.prototype, "musicState", {
            get: function () {
                return this._musicState;
            },
            set: function (value) {
                if (this._musicState != value) {
                    this._musicState = value;
                    this.checkPlayMusic();
                }
            },
            enumerable: true,
            configurable: true
        });
        GameSound.prototype.checkPlaySound = function () {
            var playingList = this.playingList.concat();
            for (var i = 0, len = playingList.length; i < len; i++) {
                var soundComp = playingList[i];
                if (soundComp) {
                    soundComp.pause = !(this._soundState && this.activate);
                }
                else {
                    console.log("播放声音可能出错");
                }
            }
        };
        GameSound.prototype.checkPlayMusic = function () {
            var soundComp = this.musicComp;
            if (soundComp) {
                soundComp.pause = !(this._musicState && this.activate);
            }
        };
        return GameSound;
    }());
    HH.GameSound = GameSound;
    __reflect(GameSound.prototype, "HH.GameSound");
    var SoundComp = (function (_super) {
        __extends(SoundComp, _super);
        function SoundComp(_isSound) {
            var _this = _super.call(this) || this;
            _this._isSound = _isSound;
            _this._pause = false;
            return _this;
        }
        Object.defineProperty(SoundComp.prototype, "isSound", {
            /**
             * true音效 false音乐
             * @returns {number}
             */
            get: function () {
                return this._isSound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundComp.prototype, "pause", {
            set: function (value) {
                if (this._pause != value) {
                    this._pause = value;
                    if (value) {
                        this.lastURL = this.url;
                        this.close();
                    }
                    else {
                        this.play(this.lastURL);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundComp.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (this._url != value) {
                    this.play(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        SoundComp.prototype.play = function (url) {
            var _this = this;
            this.lastURL = null;
            if (url != this._url) {
                var value = url;
                this._url = url;
                if (value) {
                    var isSound = this._isSound;
                    var loops_1 = isSound ? 1 : 0;
                    if (RES.hasRes(this._url)) {
                        RES.getResAsync(value, function (sound) {
                            _this.sound = sound;
                            if (!_this._pause) {
                                _this.channel = sound.play(0, loops_1);
                                sound.addEventListener(egret.Event.COMPLETE, _this.playComplete, _this);
                            }
                        }, this);
                    }
                    else {
                        RES.getResByUrl(value, function (sound) {
                            _this.sound = sound;
                            if (!_this._pause) {
                                _this.channel = sound.play(0, loops_1);
                                sound.addEventListener(egret.Event.COMPLETE, _this.playComplete, _this);
                            }
                        }, this, RES.ResourceItem.TYPE_SOUND);
                    }
                }
            }
        };
        SoundComp.prototype.playComplete = function (e) {
            e.target.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            this.close();
        };
        SoundComp.prototype.close = function () {
            this._url = null;
            if (this.sound) {
                this.sound.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
                this.sound = null;
            }
            if (this.channel) {
                this.channel.stop();
                this.channel = null;
            }
            if (this._isSound) {
                this.lastURL = null;
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
        };
        return SoundComp;
    }(egret.EventDispatcher));
    __reflect(SoundComp.prototype, "SoundComp");
})(HH || (HH = {}));
//# sourceMappingURL=GameSound.js.map