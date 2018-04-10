var TextUtil;
(function (TextUtil) {
    var textParse = new egret.HtmlTextParser();
    function color(text, content, replace, color) {
        if (text) {
            var html = "<font color=" + color + ">" + replace + "</font>";
            html = StringUtil.format(content, html);
            text.textFlow = textParse.parser(html);
        }
    }
    TextUtil.color = color;
    function createNumTxt(txt, type) {
    }
    TextUtil.createNumTxt = createNumTxt;
    function createTxt(option) {
        var txt = new egret.TextField();
        txt.size = option.size || 16;
        txt.x = option.x || 0;
        txt.y = option.y || 0;
        txt.width = option.width || 20;
        txt.height = option.height || 20;
        txt.textAlign = option.align || "center";
        txt.verticalAlign = option.verticalAlign || "middle";
        txt.textColor = option.textColor == undefined ? 0xff0000 : option.textColor;
        txt.strokeColor = option.strokeColor || 0x0;
        txt.stroke = option.stroke || 0;
        txt.bold = option.bold == true;
        return txt;
    }
    TextUtil.createTxt = createTxt;
    function createBitmapText(option) {
        var txt = new eui.BitmapLabel();
        txt.x = option.x || 0;
        txt.y = option.y || 0;
        txt.width = option.width || 20;
        txt.height = option.height || 20;
        txt.textAlign = option.align || "center";
        txt.verticalAlign = option.verticalAlign || "middle";
        txt.font = "num_message_fnt";
        return txt;
    }
    TextUtil.createBitmapText = createBitmapText;
})(TextUtil || (TextUtil = {}));
