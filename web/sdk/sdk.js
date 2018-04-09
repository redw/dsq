/* 游戏公共库：CLIENT */
(function () {
    var sdk = window.HH_SDK || {};
    sdk.clientVersion = "0.1";
    sdk.gameId = 0;
    sdk.token = null;
    sdk.frames = {};
    sdk.gameInfo = null;
    sdk.shareQRInfo = null;
    sdk.headImg = null;
    sdk.shareCB = null;
    sdk.payCB = null;

    sdk.init = function () {
        sdk.token = sdk.getURLVar("token");
    };

    // 设置分享回调
    sdk.setShareCB = function (shareCallback) {
        sdk.shareCB = shareCallback;
    };

    // 设置支付回调
    sdk.setPayCB = function (payCallback) {
        sdk.payCB = payCallback;
    };

    // 登出
    sdk.logout = function () {

    };

    // 刷新主页面
    sdk.refresh = function () {

    };

    // 判断是否是QQ环境
    sdk.isQQ = function () {
        return (navigator.userAgent.toLowerCase().match(/\bqq\b/i) == "qq");
    };

    // 判断是否是微信环境
    sdk.isWX = function () {
        return (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger");
    };

    // 判断是否是安卓设备
    sdk.isAndroid = function () {
        return navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1;
    };

    // 判断是否是IOS设备
    sdk.isIOS = function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };

    // 判断是否是PC微信环境
    sdk.isPcWx = function () {
        return (navigator.userAgent.toLowerCase().match(/WindowsWechat/i) == "windowswechat");
    };

    // 是否是移动设备
    sdk.isMobile = function () {
        var userAgent = navigator.userAgent.toLowerCase();
        var agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
        for (var v = 0; v < agents.length; v++) {
            if (userAgent.indexOf(agents[v]) > 0) {
                return true;
            }
        }
        return false;
    };

    // 获取URL中所有参数对象
    sdk.getURLQuery = function (url) {
        var query = {};
        if (url) {
            var search = url.split("?")[1];
            if (search) {
                var pairs = search.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    query[pairs[i].split("=")[0]] = unescape(pairs[i].split("=")[1]);
                }
            }
        }
        return query;
    };

    // 获取URL中的参数
    sdk.getURLVar = function (name) {
        var href = window.location.search;
        var index = href.indexOf(name);
        var token = "";
        if (index >= 0) {
            let endIndex = href.indexOf("&", index);
            endIndex = endIndex < 0 ? href.length : endIndex;
            token = href.substring(index + name.length + 1, endIndex);
        }
        return token;
    };

    // 设置URL中的参数
    sdk.setURLVar = function (url, key, value) {
        if (url) {
            var urlList = url.split("#");
            var params = {};
            var query = urlList[0].split("?")[1];
            var result = urlList[0].split("?")[0] + "?";
            if (query) {
                query = query.split("&");
                for (var i in query) {
                    var vars = query[i].split("=");
                    params[vars[0]] = vars[1];
                }
            }
            if (value) {
                params[key] = value;
            } else {
                params[key] = null;
                delete params[key];
            }
            var first = true;
            for (var i in params) {
                result += ((first ? "" : "&") + i + "=" + (params[i] ? params[i] : ""));
                first = false;
            }
            return result + (urlList[1] ? ("#" + urlList[1]) : "");
        }
        return "";
    };

    // 清空URL中的参数
    sdk.cleanURLVar = function (url) {
        if (url) {
            return url.split("?")[0];
        }
        return "";
    };

    // 设置本地存储
    sdk.setItem = function (key, value) {
        if (window.localStorage) {
            try {
                window.localStorage.setItem("hh_" + key, value);
            } catch (err) {
            }
        } else {
            var exp = new Date();
            exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
            document.cookie = "hh_" + key + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
    };

    // 获取本地存储
    sdk.getItem = function (key) {
        if (window.localStorage) {
            return window.localStorage.getItem("hh_" + key);
        } else {
            var arr = document.cookie.match(new RegExp("(^| )hh_" + key + "=([^;]*)(;|$)"));
            if (arr != null) {
                return unescape(arr[2]);
            }
        }
        return null;
    };

    // 移除本地存储
    sdk.removeItem = function (key) {
        if (window.localStorage) {
            window.localStorage.removeItem("hh_" + key);
        } else {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = sdk.getItem(key);
            if (cval != null) {
                document.cookie = "hh_" + key + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    };

    // 拼接创建一个URL
    sdk.buildURL = function (url, args) {
        if (url) {
            var urlList = url.split("#");
            var params = {};
            var query = urlList[0].split("?")[1];
            var result = urlList[0].split("?")[0] + "?";
            if (query) {
                query = query.split("&");
                for (var i in query) {
                    var vars = query[i].split("=");
                    params[vars[0]] = vars[1];
                }
            }
            for (var i in args) {
                if (args[i]) {
                    params[i] = args[i];
                }
            }
            var first = true;
            for (var i in params) {
                result += ((first ? "" : "&") + i + "=" + (params[i] ? params[i] : ""));
                first = false;
            }
            return result + (urlList[1] ? ("#" + urlList[1]) : "");
        }
        return "";
    };

    // 随机一个字符串
    sdk.randomString = function (len) {
        len = len || 32;
        var allChars = "abcdefghijklmnopqrstuvwxyz";
        var count = allChars.length;
        var str = '';
        for (var i = 0; i < len; i++) {
            str += allChars.charAt(Math.floor(Math.random() * count));
        }
        return str;
    };

    // 随机一个数字串
    sdk.randomNumber = function (len) {
        len = len || 8;
        var allChars = "0123456789";
        var count = allChars.length;
        var str = '';
        for (var i = 0; i < len; i++) {
            str += allChars.charAt(Math.floor(Math.random() * count));
        }
        return str;
    };

    // 加载单个JS文件
    sdk.loadSingleScript = function (src, callback) {
        var node = document.createElement("script");
        node.src = src;
        if (node.hasOwnProperty("async")) {
            node.async = false;
        }
        node.addEventListener("load", function () {
            this.removeEventListener("load", arguments.callee, false);
            if (callback) {
                callback();
            }
        }, false);
        document.body.appendChild(node);
    };

    // 向DOM追加单个JS文件引用
    sdk.appendSingleScript = function (src, isBody) {
        var parentNode = document.getElementsByTagName(isBody ? "body" : "head").item(0);
        var node = document.createElement("script");
        node.type = "text/javascript";
        node.src = src;
        parentNode.appendChild(node);
    };

    sdk.createQRCode = function (url, width, height, callback) {
        function __createQRCode() {
            var div = document.createElement("div");
            var qrcode = new QRCode(div, {width: width, height: height, typeNumber: -1});
            qrcode.makeCode(url);
            var img = div.getElementsByTagName("img")[0];
            img.onload = function () {
                img.onload = null;
                callback(img.src);
            }
        }

        if (window.QRCode) {
            __createQRCode();
        } else {
            sdk.loadSingleScript("//cdn.11h5.com/static/js/qrcode.min.js", function () {
                __createQRCode();
            });
        }
    };

    // HTTP GET请求
    sdk.httpGet = function (url, callback, responseType) {
        var request = null;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (request) {
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    callback(responseType == "json" ? JSON.parse(request.responseText) : request.responseText);
                }
            };
            request.open("GET", url, true);
            request.send();
        }
    };

    sdk.checkWebP = function(callback) {
        var webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACwAgCdASoUAAEAPpE6l0eloyIhMAgAsBIJaQAAeyAA/vhNAAA=';
        webP.onload = webP.onerror = function () {
            if (callback) {
                callback(webP.height === 1);
            }
        };
    }


    sdk.init();
    window.HH_SDK = sdk;
})();
var sdk = window.HH_SDK;
