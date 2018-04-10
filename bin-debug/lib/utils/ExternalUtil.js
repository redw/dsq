var ExternalUtil;
(function (ExternalUtil) {
    function getURLVar(name) {
        var sdk = window["sdk"];
        return sdk.getURLVar(name);
    }
    ExternalUtil.getURLVar = getURLVar;
    ;
    function copyContent(content) {
        if (window["clipboardData"]) {
            window["clipboardData"].clearData();
            window["clipboardData"].setData("Text", content);
        }
    }
    ExternalUtil.copyContent = copyContent;
    function createQRCode(url, width, height, callback) {
        var sdk = window["sdk"];
        sdk.createQRCode(url, width, height, callback);
    }
    ExternalUtil.createQRCode = createQRCode;
    function loadSingleScript(url, back) {
        var sdk = window["sdk"];
        sdk.loadSingleScript(url, back);
    }
    ExternalUtil.loadSingleScript = loadSingleScript;
    function setURLVar(url, key, value) {
        var sdk = window["sdk"];
        return sdk.setURLVar(url, key, value);
    }
    ExternalUtil.setURLVar = setURLVar;
    ;
    function cleanURLVar(url) {
        var sdk = window["sdk"];
        return sdk.cleanURLVar(url);
    }
    ExternalUtil.cleanURLVar = cleanURLVar;
    ;
    function setItem(key, value) {
        var sdk = window["sdk"];
        sdk.setItem(key, value);
    }
    ExternalUtil.setItem = setItem;
    ;
    function getItem(key) {
        var sdk = window["sdk"];
        return sdk.getItem(key);
    }
    ExternalUtil.getItem = getItem;
    ;
    function removeItem(key) {
        var sdk = window["sdk"];
        sdk.removeItem(key);
    }
    ExternalUtil.removeItem = removeItem;
    ;
    // 判断是否是QQ环境
    function isQQ() {
        var sdk = window["sdk"];
        return sdk.isQQ();
    }
    ExternalUtil.isQQ = isQQ;
    ;
    // 判断是否是微信环境
    function isWX() {
        var sdk = window["sdk"];
        return sdk.isWX();
    }
    ExternalUtil.isWX = isWX;
    // 判断是否是安卓设备
    function isAndroid() {
        var sdk = window["sdk"];
        return sdk.isAndroid();
    }
    ExternalUtil.isAndroid = isAndroid;
    ;
    // 判断是否是IOS设备
    function isIOS() {
        var sdk = window["sdk"];
        return sdk.isIOS();
    }
    ExternalUtil.isIOS = isIOS;
    ;
    // 判断是否是PC微信环境
    function isPcWx() {
        var sdk = window["sdk"];
        return sdk.isPcWx();
    }
    ExternalUtil.isPcWx = isPcWx;
    ;
})(ExternalUtil || (ExternalUtil = {}));
