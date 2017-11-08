define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"text!../str/zhimayin.html?time="+new Date(), "css!../css/zhimayin.css?time="+new Date()],
    function ($,Component,headers,html) {
    function render() {
        $(".main").html(html);
        headers.render("芝麻信用","remove");
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            sessionStorage.setItem("ji", 1)
        } else if (/android/.test(ua)) {
            sessionStorage.setItem("ji", 2)
        }

        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }

        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            sessionStorage.setItem("ji", 1)
        }
        else if (browser.versions.android) {
            sessionStorage.setItem("ji", 2)
        }


        $(".app").click(function () {
            if (sessionStorage.getItem("ji") == 1) {
                window.location.href = "https://itunes.apple.com/us/app/xin-yong-jin-ku/id1241617822?l=zh&ls=1&mt=8"

            } else if (sessionStorage.getItem("ji") == 2) {
                window.location.href = "http://app.qq.com/#id=detail&appid=1106223920"

            } else {
                window.location.href = "http://app.qq.com/#id=detail&appid=1106223920"
            }

        })

    }

    return {
        render: render
    }
})
