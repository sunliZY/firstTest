define(["jquery", "./publicComponent.js?time="+new Date(), "./headers.js?time="+new Date(), "./mima", "public", "layer", "md5",
        "text!../str/denglumi.html?time=" + new Date(), "css!../css/denglumi.css?time=" + new Date(), "css!../css/layer.css"],
    function ($, Component, headers, mima, mc, layer, md5, html) {
        function render() {
            $(".main").html(html);
            mima.render(".btjsd", ".pass");
            headers.render("信用金库");
            //设置显示的账号
            $(".tit").html(sessionStorage.getItem("cunchuzhang"));
            console.log(GetImei());
            methods();
        }

        function methods(){
            //忘记密码
            $(".wangji").on("click", function () {
                window.location.href = "#xiugaimi?name=" + $(".tit").html()
            });

            $(".btjsd").on("click", function () {
                if ($(".pass").val() == "" && $(".text").val() == "") {
                    layer.msg('请输入密码', {time: 2000});
                }else{
                    getSwiperData()
                }
            })
        }

        function getSwiperData() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
            var mima = $(".pass").val() ? $(".pass").val() : $(".text").val();
            var r = ["userLogin",
                {
                    "username": $(".tit").html(),
                    "password": mima,
                    "imei":GetImei()
                }];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    localStorage.setItem("phone", $(".tit").html());
                    var ISiosAnH5s = ISiosAnH5();
                    if (ISiosAnH5s) {
                        if (ISiosAnH5s.PhoneType == "H5") {
                            window.location.href = Component.render().use() + ".xinyongjinku.com/app/movepage/listdetails.html?PhoneType=H5&listid=" + ISiosAnH5s.listid;
                        }
                    } else {
                        window.location.href = "#jiekuanzhu";
                    }
                    // localStorage.setItem("user_id", rs.result.data.id);
                    // var hash =  hex_md5(localStorage.getItem("user_id", rs.result.data.id));
                    //
                    // (function () {
                    //     _saber = {
                    //         partnerId: 'wanglibank',
                    //         tokenKey: hash
                    //     };
                    //     var aa = document.createElement('script');
                    //     aa.async = tfjcnv n jvgkkvjn kvjrue;
                    //     aa.src = ('https:' == document.location.protocol ? 'https://' :
                    //         'http://') + 'dfst.baiqishi.com/static/webdf/saber.js?t=' + (new
                    //     Date().getTime()/3600000).toFixed(0);
                    //     var bb = document.getElementsByTagName('script')[0];
                    //     bb.parentNode.insertBefore(aa, bb);
                    //     sessionStorage.setItem("tokenKey", _saber.tokenKey);
                    // })();
                    //
                    // var api_url = Component.render().use()+".xinyongjinku.com/risk/user.php?c=index";
                    //
                    // Rendering();
                    // function Rendering(){
                    //     var d = [
                    //         "collectinfo",
                    //         {
                    //
                    //             "userId":localStorage.getItem("user_id"),
                    //             "tokenkey":sessionStorage.getItem("tokenKey"),
                    //             "eventType":"userLogin",
                    //             "platform":"H5"
                    //         }
                    //     ];
                    //     var json = api.JsonpArr(d);
                    //     //console.log(json);
                    //     api.call(json,api_url).done(function () {
                    //         $(".donghua").hide();
                    //
                    //         var ISiosAnH5s=ISiosAnH5();
                    //         if(ISiosAnH5s){
                    //             if(ISiosAnH5s.PhoneType=="H5"){
                    //                 window.location.href = Component.render().use()+".xinyongjinku.com/app/movepage/listdetails.html?PhoneType="+ISiosAnH5s.PhoneType+"&listid="+ISiosAnH5s.listid;
                    //             }
                    //         }else{
                    //             window.location.href = "#jiekuanzhu";
                    //         }
                    //     })
                    //
                    // }
                }
            });
        }
        //判断来源渠道
        function ISiosAnH5() {
            if (window.location.href.split("?")[1] != undefined) {
                var Url = window.location.href.split("?")[1].split("&");
                var lacationObj = {};
                for (var i = 0; i < Url.length; i++) {
                    var ks = Url[i].split("=");
                    lacationObj[ks[0]] = ks[1]
                }
                return lacationObj;
            } else {
                return false;
            }
        }

        //生成的唯一 Imei
        function GetImei() {
            if (localStorage.getItem("IMEI")) {

            } else {
                var imei = new Date().getTime() + (Math.random() * 1000).toString(16).substr(2);
                localStorage.setItem("IMEI", imei)
            }
            return localStorage.getItem("IMEI");
        }

        return {
            render: render
        }
    })
