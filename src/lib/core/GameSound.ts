module HH {
    export class GameSound {
        private stage:egret.Stage;
        private freeList:SoundComp[];
        private soundCompList:SoundComp[];
        private playingList:SoundComp[];
        private musicComp:SoundComp;
        private _soundState = true;
        private _musicState = true;
        private activate = true;

        public constructor(game:{stage:egret.Stage}) {
            this.stage = game.stage;

            // if (!ExternalUtil.isIOS()) {
            this.stage.addEventListener(egret.Event.DEACTIVATE, ()=>{
                this.activate = false;
                this.checkPlayMusic();
                this.checkPlaySound();
            }, this);

            this.stage.addEventListener(egret.Event.ACTIVATE, ()=>{
                this.activate = true;
                this.checkPlayMusic();
                this.checkPlaySound();
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
        public playMusic(url:string) {
            this.play(url, 0);
        }

        /**
         * 播音效
         * @param url
         */
        public playSound(url:string) {
            this.play(url, 1);
        }

        private play(url:string, loops:number) {
            let isSound = Boolean(loops);
            if (isSound) {
                let soundComp = this.freeList.pop();
                if (!soundComp) {
                    soundComp = new SoundComp(loops);
                }
                this.playingList.push(soundComp);
                soundComp.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
                soundComp.play(url);
            } else {
                if (!this.musicComp) {
                    this.musicComp = new SoundComp(loops);
                }
                this.musicComp.play(url);
            }
        }

        private playComplete(e:egret.Event) {
            let soundComp:SoundComp = e.target;
            if (soundComp.isSound) {
                ArrayUtil.removeItem(this.playingList, soundComp);
            }
            soundComp.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            this.freeList.push(soundComp);
        }

        public get soundState() {
            return this._soundState;
        }

        public set soundState(value:boolean) {
            if (this._soundState != value) {
                this._soundState = value;
                this.checkPlaySound();
            }
        }

        public get musicState() {
            return this._musicState;
        }

        public set musicState(value:boolean) {
            if (this._musicState != value) {
                this._musicState = value;
                this.checkPlayMusic();
            }
        }

        private checkPlaySound() {
            let playingList = this.playingList.concat();
            for (let i = 0, len = playingList.length; i < len; i++) {
                let soundComp = playingList[i];
                if (soundComp) {
                    soundComp.pause = !(this._soundState && this.activate);
                } else {
                    console.log("播放声音可能出错");
                }
            }
        }

        private checkPlayMusic() {
            let soundComp:SoundComp = this.musicComp;
            if (soundComp) {
                soundComp.pause = !(this._musicState && this.activate);
            }
        }
    }

    class SoundComp extends egret.EventDispatcher{
        private _url:string;
        private lastURL:string;
        private _pause = false;
        private channel:egret.SoundChannel;
        private sound:egret.Sound;

        public constructor(private _isSound) {
            super();
        }

        /**
         * true音效 false音乐
         * @returns {number}
         */
        public get isSound() {
            return this._isSound;
        }

        public set pause(value:boolean) {
            if (this._pause != value) {
                this._pause = value;
                if (value) {
                    this.lastURL = this.url;
                    this.close();
                } else {
                    this.play(this.lastURL);
                }
            }
        }

        public set url(value:string) {
            if (this._url != value) {
                this.play(value);
            }
        }

        public get url() {
            return this._url;
        }

        public play(url:string) {
            this.lastURL = null;
            if (url != this._url) {
                let value = url;
                this._url = url;
                if (value) {
                    let isSound = this._isSound;
                    let loops = isSound ? 1 : 0;
                    if (RES.hasRes(this._url)) {
                        RES.getResAsync(value, (sound:egret.Sound)=>{
                            this.sound = sound;
                            if (!this._pause) {
                                this.channel = sound.play(0, loops);
                                sound.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
                            }
                        }, this);
                    } else {
                        RES.getResByUrl(value, (sound:egret.Sound)=>{
                            this.sound = sound;
                            if (!this._pause) {
                                this.channel = sound.play(0, loops);
                                sound.addEventListener(egret.Event.COMPLETE, this.playComplete, this);
                            }
                        }, this, RES.ResourceItem.TYPE_SOUND)
                    }
                }
            }
        }

        private playComplete(e:egret.Event) {
            e.target.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            this.close();
        }

        private close() {
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
        }
    }
}