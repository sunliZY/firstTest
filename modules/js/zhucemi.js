define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"layer", "./mima",
        'public','md5', "text!../str/zhucemi.html?time="+new Date(), "css!../css/zhucemi.css?time="+new Date(), "css!../css/layer.css"],
    function ($, Component,headers,layer, mima, mc,md5, html) {
        function render() {
            $(".main").html(html);
            headers.render("注册");
            mima.render();
            Component.render().check();

            //设置显示的账号
            $(".tit").html(sessionStorage.getItem("cunchuzhang"));
            $(".huoyan").html("获取验证码");
            $(".pass").blur(function () {
                var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
                var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
                if (A == "") {

                } else if (!reg.test(A)) {
                    layer.msg("ֻ密码格式不正确", {time: 2000});
                    $(this).val("");
                    return;
                }
            });
            $(".text").blur(function () {
                var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
                var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
                if (A == "") {

                } else if (!reg.test(A)) {
                    layer.msg("ֻ密码格式不正确", {time: 2000});
                    $(this).val("");
                    return;
                }
            });
            var time;
            $(".huoyan").on("click", function () {
                if ($(".huoyan").html() == "重新发送" || $(".huoyan").html() == "获取验证码") {
                    var num = 60;
                    time = setInterval(function () {
                        num--;
                        $(".huoyan").html(num + "s");
                        $(".huoyan").css("color", "#ccc");
                        if (num == 0) {
                            clearInterval(time);
                            $(".huoyan").html("重新发送");
                            $(".huoyan").css("color", "#D8AA5A");
                        }
                    }, 1000)
                    var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
                    getSwiperDatao()
                    function getSwiperDatao() {
                        var r = ["messageAuth",
                            {
                                "mobile": $(".tit").html(),
                                "node_name": "register"
                            }];
                        var json = api.JsonpArr(r);
                        api.call(json, api_url).done(function (rs) {
                            //console.log(rs);
                            if (rs.error) {
                                Component.render().error(rs.error);
                                clearInterval(time);
                                $(".huoyan").html("重新发送")
                                $(".huoyan").css("color", "#D8AA5A")
                            } else {
                                $(".huoyan").addClass("aaaaa");
                                $(".key").html(rs.result.data.key)
                            }
                        });
                    }
                }
            })

            $(".btjsd").on("click", function () {
                if ($(".yans").val() == "") {
                    layer.msg("请输入验证码", {time: 2000});
                    return
                }
                if ($(".pass").val() == "" && $(".text").val() == "") {
                    layer.msg("请输入密码", {time: 2000});
                    return
                }
                if ($(".aaaaa").length == 0) {
                    layer.msg("请先获取验证码", {time: 2000});
                    return
                }
                if ($(".check").length == 0) {
                    layer.msg("是否阅读注册协议并同意", {time: 2000});
                    return
                }
                $(".huoyan").html("获取验证码");
                $(".huoyan").css("color", "#D8AA5A");
                clearInterval(time);

                var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
                getSwiperData()
                function getSwiperData() {
                    var mima;
                    mima = $(".pass").val() ? $(".pass").val() : $(".text").val();
                    var r = [
                        "signin",
                        {
                            "username": $(".tit").html(),
                            "sms_key": $(".key").html(),
                            "sms_code": $(".yans").val(),//验证码
                            "password": mima,//密码
                            "imei":GetImei(),
                            "source_id": localStorage.getItem("rule") //用户来源渠道ID
                        }
                    ];
                    var json = api.JsonpArr(r);
                    api.call(json, api_url).done(function (rs) {
                        $(".donghua").hide();
                        if (rs.error) {
                            Component.render().error(rs.error);
                        } else {
                            $(".donghua").hide();
                            var ISiosAnH5s=ISiosAnH5();
                            if(ISiosAnH5s){
                                if(ISiosAnH5s.PhoneType=="H5"){
                                    window.location.href = Component.render().use()+".xinyongjinku.com/app/movepage/listdetails.html?PhoneType=H5&listid="+ISiosAnH5s.listid;
                                }
                            }else{
                                window.location.href = "#jiekuanzhu";
                            }
                        }
                    });
                }

                //白骑士
                //  var hash =  hex_md5(localStorage.getItem("cunchuzhang"));
                //
                // (function () {
                //     _saber = {
                //         partnerId: 'wanglibank',
                //         tokenKey: hash
                //     };
                //     var aa = document.createElement('script');
                //     aa.async = true;
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
                //             "userId":$(".tit").html(),
                //             "tokenkey":sessionStorage.getItem("tokenKey"),
                //             "eventType":"signin",
                //             "platform":"H5"
                //         }
                //     ];
                //     var json = api.JsonpArr(d);
                //     //console.log(json);
                //     api.call(json,api_url).done(function () {
                //
                //
                //     })
                // }

            })
        }

        function ISiosAnH5(){
            if(window.location.href.split("?")[1]!=undefined){
                var Url=window.location.href.split("?")[1].split("&");
                var lacationObj={};
                for(var i = 0; i <Url.length;i++ ){
                    var ks=Url[i].split("=");
                    lacationObj[ks[0]]=ks[1]
                }
                return lacationObj;
            }else{
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
