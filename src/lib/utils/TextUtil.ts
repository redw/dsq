module TextUtil {
    let textParse = new egret.HtmlTextParser();

    export function color(text:eui.Label, content:string, replace:string, color:number|string) {
        if (text) {
            let html = "<font color=" + color + ">" + replace + "</font>";
            html = StringUtil.format(content, html);
            text.textFlow = textParse.parser(html);
        }
    }
     export function createNumTxt(txt:number,type:string,)
      { 
      }

    export function createTxt(option:any) {
        let txt = new egret.TextField();
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

    export function createBitmapText(option:any) {
        let txt = new eui.BitmapLabel();
        txt.x = option.x || 0;
        txt.y = option.y || 0;
        txt.width = option.width || 20;
        txt.height = option.height || 20;
        txt.textAlign = option.align || "center";
        txt.verticalAlign = option.verticalAlign || "middle";
        txt.font = "num_message_fnt";
        return txt;
    }
}