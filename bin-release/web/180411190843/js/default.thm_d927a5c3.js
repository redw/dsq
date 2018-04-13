
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"}
generateEUI.paths['resource/skins/AnimalHeadSkin.exml'] = window.AnimalHeadSkin = (function (_super) {
	__extends(AnimalHeadSkin, _super);
	function AnimalHeadSkin() {
		_super.call(this);
		this.skinParts = ["imgLight","headImg","borderImg","sexImg"];
		
		this.height = 66;
		this.width = 67;
		this.elementsContent = [this.imgLight_i(),this.headImg_i(),this.borderImg_i(),this.sexImg_i()];
	}
	var _proto = AnimalHeadSkin.prototype;

	_proto.imgLight_i = function () {
		var t = new eui.Image();
		this.imgLight = t;
		t.horizontalCenter = 0;
		t.source = "animal_bg_23_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.headImg_i = function () {
		var t = new eui.Image();
		this.headImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 54;
		t.horizontalCenter = 0;
		t.source = "robot_head_1_jpg";
		t.verticalCenter = 0;
		t.width = 54;
		return t;
	};
	_proto.borderImg_i = function () {
		var t = new eui.Image();
		this.borderImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.source = "pvp_head_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.sexImg_i = function () {
		var t = new eui.Image();
		this.sexImg = t;
		t.source = "common_boy_png";
		t.width = 24;
		t.x = 44;
		t.y = -4;
		return t;
	};
	return AnimalHeadSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalHpBarBlueSkin.exml'] = window.AnimalHpBarBlueSkin = (function (_super) {
	__extends(AnimalHpBarBlueSkin, _super);
	function AnimalHpBarBlueSkin() {
		_super.call(this);
		this.skinParts = ["imgLight","thumb","imgShine"];
		
		this.height = 291;
		this.width = 32;
		this.elementsContent = [this.imgLight_i(),this._Image1_i(),this.thumb_i(),this.imgShine_i(),this._Image2_i()];
	}
	var _proto = AnimalHpBarBlueSkin.prototype;

	_proto.imgLight_i = function () {
		var t = new eui.Image();
		this.imgLight = t;
		t.alpha = 0;
		t.horizontalCenter = 0;
		t.source = "animal_bg_22_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "animali_bar_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.scale9Grid = new egret.Rectangle(4,16,22,260);
		t.source = "animali_bar_2_blue_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgShine_i = function () {
		var t = new eui.Image();
		this.imgShine = t;
		t.alpha = 0;
		t.source = "animali_bar_3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "animali_bar_4_png";
		t.verticalCenter = 0;
		return t;
	};
	return AnimalHpBarBlueSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalHpBarSkin.exml'] = window.AnimalHpBarSkin = (function (_super) {
	__extends(AnimalHpBarSkin, _super);
	function AnimalHpBarSkin() {
		_super.call(this);
		this.skinParts = ["imgLight","thumb","imgShine"];
		
		this.height = 291;
		this.width = 32;
		this.elementsContent = [this.imgLight_i(),this._Image1_i(),this.thumb_i(),this.imgShine_i(),this._Image2_i()];
	}
	var _proto = AnimalHpBarSkin.prototype;

	_proto.imgLight_i = function () {
		var t = new eui.Image();
		this.imgLight = t;
		t.alpha = 0;
		t.horizontalCenter = 0;
		t.source = "animal_bg_25_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "animali_bar_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.scale9Grid = new egret.Rectangle(4,16,22,260);
		t.source = "animali_bar_2_red_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgShine_i = function () {
		var t = new eui.Image();
		this.imgShine = t;
		t.alpha = 0;
		t.source = "animali_bar_3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "animali_bar_4_png";
		t.verticalCenter = 0;
		return t;
	};
	return AnimalHpBarSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalIconSkin.exml'] = window.AnimalIconSkin = (function (_super) {
	__extends(AnimalIconSkin, _super);
	function AnimalIconSkin() {
		_super.call(this);
		this.skinParts = ["typeImg","animalImg","frontGroup","backImg"];
		
		this.height = 114;
		this.width = 111;
		this.elementsContent = [this.frontGroup_i(),this.backImg_i()];
	}
	var _proto = AnimalIconSkin.prototype;

	_proto.frontGroup_i = function () {
		var t = new eui.Group();
		this.frontGroup = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.elementsContent = [this.typeImg_i(),this.animalImg_i()];
		return t;
	};
	_proto.typeImg_i = function () {
		var t = new eui.Image();
		this.typeImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.85;
		t.scaleY = 0.85;
		t.source = "animal_bule_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.animalImg_i = function () {
		var t = new eui.Image();
		this.animalImg = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.85;
		t.scaleY = 0.85;
		t.source = "animal_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.backImg_i = function () {
		var t = new eui.Image();
		this.backImg = t;
		t.horizontalCenter = 0;
		t.source = "animal_bg_3_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return AnimalIconSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalNoticeAtkSkin.exml'] = window.AnimalNoticeAtkSkin = (function (_super) {
	__extends(AnimalNoticeAtkSkin, _super);
	function AnimalNoticeAtkSkin() {
		_super.call(this);
		this.skinParts = ["imgSelect","imgRight","imgLeft","imgUp","imgDown"];
		
		this.height = 114;
		this.width = 111;
		this.elementsContent = [this.imgSelect_i(),this.imgRight_i(),this.imgLeft_i(),this.imgUp_i(),this.imgDown_i()];
	}
	var _proto = AnimalNoticeAtkSkin.prototype;

	_proto.imgSelect_i = function () {
		var t = new eui.Image();
		this.imgSelect = t;
		t.source = "animal_bg_15_png";
		t.touchEnabled = false;
		t.x = 15;
		t.y = 16;
		return t;
	};
	_proto.imgRight_i = function () {
		var t = new eui.Image();
		this.imgRight = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 4;
		return t;
	};
	_proto.imgLeft_i = function () {
		var t = new eui.Image();
		this.imgLeft = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = 180;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 108;
		return t;
	};
	_proto.imgUp_i = function () {
		var t = new eui.Image();
		this.imgUp = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = -90;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.x = 56;
		t.y = 108;
		return t;
	};
	_proto.imgDown_i = function () {
		var t = new eui.Image();
		this.imgDown = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = 90;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.x = 56;
		t.y = 5;
		return t;
	};
	return AnimalNoticeAtkSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalNoticeGoSkin.exml'] = window.AnimalNoticeGoSkin = (function (_super) {
	__extends(AnimalNoticeGoSkin, _super);
	function AnimalNoticeGoSkin() {
		_super.call(this);
		this.skinParts = ["imgUp","imgRight","imgLeft","imgDown"];
		
		this.height = 114;
		this.width = 111;
		this.elementsContent = [this.imgUp_i(),this.imgRight_i(),this.imgLeft_i(),this.imgDown_i()];
	}
	var _proto = AnimalNoticeGoSkin.prototype;

	_proto.imgUp_i = function () {
		var t = new eui.Image();
		this.imgUp = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = -90;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.x = 56;
		t.y = -2;
		return t;
	};
	_proto.imgRight_i = function () {
		var t = new eui.Image();
		this.imgRight = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 110;
		return t;
	};
	_proto.imgLeft_i = function () {
		var t = new eui.Image();
		this.imgLeft = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = 180;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 2;
		return t;
	};
	_proto.imgDown_i = function () {
		var t = new eui.Image();
		this.imgDown = t;
		t.anchorOffsetX = 20;
		t.anchorOffsetY = 18;
		t.rotation = 90;
		t.source = "animal_bg_16_png";
		t.touchEnabled = false;
		t.x = 56;
		t.y = 112;
		return t;
	};
	return AnimalNoticeGoSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalNoticeSKin.exml'] = window.AnimalNoticeSKin = (function (_super) {
	__extends(AnimalNoticeSKin, _super);
	function AnimalNoticeSKin() {
		_super.call(this);
		this.skinParts = ["imgTurnShow"];
		
		this.height = 80;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.imgTurnShow_i()];
	}
	var _proto = AnimalNoticeSKin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "animal_json.animal_bg_14_png";
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgTurnShow_i = function () {
		var t = new eui.Image();
		this.imgTurnShow = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "animali_label_2_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return AnimalNoticeSKin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalPanelSkin.exml'] = window.AnimalPanelSkin = (function (_super) {
	__extends(AnimalPanelSkin, _super);
	function AnimalPanelSkin() {
		_super.call(this);
		this.skinParts = ["imgSelect","chessGroup","divTime","endGroup","blueGroup","redGroup","imgAtked"];
		
		this.height = 1068;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.imgSelect_i(),this._Image3_i(),this.chessGroup_i(),this.divTime_i(),this.endGroup_i(),this.blueGroup_i(),this.redGroup_i(),this.imgAtked_i()];
	}
	var _proto = AnimalPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "animal_bg_20_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "animal_bg_13_png";
		t.y = 13;
		return t;
	};
	_proto.imgSelect_i = function () {
		var t = new eui.Image();
		this.imgSelect = t;
		t.height = 916;
		t.scale9Grid = new egret.Rectangle(59,57,43,40);
		t.source = "animal_bg_24_png";
		t.width = 517;
		t.x = 60;
		t.y = 149;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "animal_bg_21_png";
		t.x = 81;
		t.y = 173;
		return t;
	};
	_proto.chessGroup_i = function () {
		var t = new eui.Group();
		this.chessGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 830;
		t.width = 432;
		t.x = 101;
		t.y = 189;
		return t;
	};
	_proto.divTime_i = function () {
		var t = new eui.BitmapLabel();
		this.divTime = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "num_animal_time_fnt";
		t.horizontalCenter = 0;
		t.letterSpacing = -3;
		t.text = "0s";
		t.verticalCenter = -407;
		return t;
	};
	_proto.endGroup_i = function () {
		var t = new eui.Group();
		this.endGroup = t;
		t.height = 1067;
		t.touchEnabled = false;
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.blueGroup_i = function () {
		var t = new eui.Group();
		this.blueGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 235;
		t.x = 27;
		t.y = 92;
		t.elementsContent = [this._Label1_i(),this._Image4_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.name = "nameLbl";
		t.size = 20;
		t.stroke = 2;
		t.text = "蓝方名字";
		t.textColor = 0x209efe;
		t.x = 75;
		t.y = 5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.name = "arrowImg";
		t.source = "animal_bg_9_png";
		t.x = 89;
		t.y = 32;
		return t;
	};
	_proto.redGroup_i = function () {
		var t = new eui.Group();
		this.redGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.touchEnabled = false;
		t.width = 235;
		t.x = 377;
		t.y = 92;
		t.elementsContent = [this._Label2_i(),this._Image5_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.name = "nameLbl";
		t.right = 78;
		t.size = 20;
		t.stroke = 2;
		t.text = "电脑";
		t.textColor = 0xea5f60;
		t.y = 5;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.name = "arrowImg";
		t.scaleX = -1;
		t.source = "animal_bg_11_png";
		t.x = 145;
		t.y = 32;
		return t;
	};
	_proto.imgAtked_i = function () {
		var t = new eui.Image();
		this.imgAtked = t;
		t.alpha = 0;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "mapevent_atked_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return AnimalPanelSkin;
})(eui.Skin);generateEUI.paths['resource/skins/AnimalResultNoticeSkin.exml'] = window.AnimalResultNoticeSkin = (function (_super) {
	__extends(AnimalResultNoticeSkin, _super);
	function AnimalResultNoticeSkin() {
		_super.call(this);
		this.skinParts = ["imgResult"];
		
		this.height = 113;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.imgResult_i()];
	}
	var _proto = AnimalResultNoticeSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "animal_json.animal_bg_14_png";
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgResult_i = function () {
		var t = new eui.Image();
		this.imgResult = t;
		t.source = "animal_2_json.animali_label_lose_1_png";
		t.touchEnabled = false;
		t.x = 124;
		t.y = 10;
		return t;
	};
	return AnimalResultNoticeSkin;
})(eui.Skin);