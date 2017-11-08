define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"./mima",'public',"layer",
        "text!../str/xiugaimi.html?time="+new Date(),"css!../css/zhucemi.css?time="+new Date(), "css!../css/layer.css"],
    function($,Component,headers,mima, mc, layer,html){
    function render(){
        $(".main").html(html);
        headers.render("修改登录密码");
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
                layer.msg("ֻ密码格式不正确", {time:2000});
                $(this).val("");
                return;
            }
        });

        $(".text").blur(function () {
            var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
            var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
            if (A == "") {

            } else if (!reg.test(A)) {
                layer.msg("ֻ密码格式不正确", {time:2000});
                $(this).val("");
                return;
            }
        });
        var time;
        $(".huoyan").on("click",function () {
            if ($(".huoyan").html() == "重新发送" || $(".huoyan").html() == "获取验证码") {
                var num = 60;
                time = setInterval(function () {
                    num--
                    $(".huoyan").html(num + "s")
                    $(".huoyan").css("color", "#ccc")
                    if (num == 0) {
                        clearInterval(time);
                        $(".huoyan").html("重新发送")
                        $(".huoyan").css("color", "#D8AA5A")
                    }
                }, 1000)

                var api_url = Component.render().use()+".xinyongjinku.com/passport/user.php?c=account";
                getSwiperData()
                function getSwiperData() {
                var r = ["messageAuth",
                    {
                        "mobile": $(".tit").html(),
                        "node_name" : "forgot_password"  //忘记密码时用这个
                    }];
                    var json = api.JsonpArr(r);
                    api.call(json, api_url).done(function (rs) {
                        $(".donghua").hide();
                        if (rs.error) {
                            clearInterval(time);
                            $(".huoyan").html("重新发送");
                            $(".huoyan").css("color", "#D8AA5A");
                            Component.render().error(rs.error);
                        } else{
                            $(".key").html(rs.result.data.key)
                        }
                    });
                }
            }
        })


        $(".btjsd").on("click",function(){

            if ($(".pass").val() == "" && $(".text").val() == "") {
                layer.msg('请输入密码', {time: 2000});
                return
            }

            if($(".yans").val()=="" ){
                layer.msg("请输入验证码", {time:2000});
                return
            }

            var mima;
            mima = $(".pass").val() ? $(".pass").val() : $(".text").val();

            var api_url = Component.render().use()+".xinyongjinku.com/passport/user.php?c=account";
            
             getSwiperDatas()
                        function getSwiperDatas() {
                            var r = ["savePassword",
                                {
                                    "phone": $(".tit").html(),
                                    "sms_key": $(".key").html(),
                                    "sms_code": $(".yans").val(),
                                    "password" : mima
                                }
                            ];
                            var jsons = api.JsonpArr(r);
                            api.call(jsons, api_url).done(function (rs) {
                                clearInterval(time)
                                $(".huoyan").html("重新发送")
                                $(".yans").val("")
                                $(".pass").val("")
                                $(".text").val("")

                                $(".donghua").hide();
                                if (rs.error) {
                                    Component.render().error(rs.error);
                                }else{
                                    window.location.href="#zhucezhang"
                                }
                            });
                        }

        })

    }
    return {
        render : render
    }
})
