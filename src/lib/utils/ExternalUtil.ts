module ExternalUtil {
    export function getURLVar(name) {
        let sdk = window["sdk"];
        return sdk.getURLVar(name);
    };

    export function copyContent(content:string) {
        if (window["clipboardData"]) {
            window["clipboardData"].clearData();
            window["clipboardData"].setData("Text", content);
        }
    }

    export function createQRCode(url:string, width:number, height:number, callback:Function) {
        let sdk = window["sdk"];
        sdk.createQRCode(url, width, height, callback);
    }

    export function loadSingleScript(url:string, back:Function) {
        let sdk = window["sdk"];
        sdk.loadSingleScript(url, back);
    }

    export  function setURLVar(url, key, value) {
        let sdk = window["sdk"];
        return sdk.setURLVar(url, key, value);
    };

    export function cleanURLVar(url) {
        let sdk = window["sdk"];
        return sdk.cleanURLVar(url);
    };

    export function setItem(key, value) {
        let sdk = window["sdk"];
        sdk.setItem(key, value);
    };

    export function getItem(key) {
        let sdk = window["sdk"];
        return sdk.getItem(key);
    };

    export function removeItem(key) {
        let sdk = window["sdk"];
        sdk.removeItem(key);
    };

    // 判断是否是QQ环境
   export function isQQ() {
       let sdk = window["sdk"];
       return sdk.isQQ();
    };

    // 判断是否是微信环境
    export function isWX() {
        let sdk = window["sdk"];
        return sdk.isWX();
    }

    // 判断是否是安卓设备
    export function isAndroid () {
        let sdk = window["sdk"];
        return sdk.isAndroid();
    };

    // 判断是否是IOS设备
    export function isIOS() {
        let sdk = window["sdk"];
        return sdk.isIOS();
    };

    // 判断是否是PC微信环境
    export function isPcWx() {
        let sdk = window["sdk"];
        return sdk.isPcWx();
    };
}