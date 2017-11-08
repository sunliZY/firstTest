define(["jquery", "public", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "layer",
        "text!../str/yinhangkajia.html?time="+new Date(), "css!../css/yinhangkajia.css?time="+new Date(), "css!../css/layer.css"],
    function ($,mc, Component,headers, layer, html) {
        function render() {
            $(".main").html(html);
            headers.render("添加银行卡");
            Component.render().check();
            //持卡人提示
            $(".littleTip").on("click", function () {
                $(".mBox").show();
                $(".xbox").show();
            })
            $(".know").on("click", function () {
                $(".mBox").hide();
                $(".xbox").hide()
            })

            //验证手机号码
            $("#yph").blur(function () {
                var A = $(this).val()
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (A == "") {

                } else if (!reg.test(A)) {
                    layer.msg("请输入正确手机号码", {time: 2000});
                    return
                }

            });
            //验证银行卡
            $("#kahao").blur(function () {
                    var A = $(this).val()
                    var reg = /^(\d{16}|\d{19})$/

                    if (A == "") {

                    } else if (!reg.test(A)) {
                        layer.msg("请输入正确银行卡", {time: 2000});
                        return
                    } else {
                        var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
                        getSwiperData()
                        function getSwiperData() {
                            var r = ["cardInfo",
                                {
                                    "cardno": $("#kahao").val()
                                }
                            ];
                            var json = api.JsonpArr(r);
                            api.call(json, api_url).done(function (rs) {
                                $(".donghua").hide();
                                if (rs.error) {
                                    Component.render().error(rs.error);
                                } else {
                                    var yinhangka = {
                                        kaying: rs.result.data.bankcode,
                                        kaming: rs.result.data.bankname,
                                        kahao: rs.result.data.cardno,
                                        kalogo: rs.result.data.bank_logo
                                    }

                                    var len = rs.result.data.cardno
                                    var lens = len.substring((len.length - 4), len.length)
                                    var str = rs.result.data.bankname + "(尾号" + lens + ")"
                                    $(".conts ul li").eq(2).find("input").val(str)
                                    sessionStorage.setItem("yinhangkas", JSON.stringify(yinhangka))
                                }
                            })
                        }
                    }
                }
            );

            var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
            getSwiperDatastt()
            function getSwiperDatastt() {
                var r = ["profile"];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        var yonghu = {
                            id: rs.result.data.id,
                            username: rs.result.data.user_name, //用户姓名
                            idnumber: rs.result.data.id_number,   //身份证号
                            phone: localStorage.getItem("userName")
                        }
                        $(".conts ul li").eq(0).find("span").eq(1).html(rs.result.data.user_name)// 持卡人
                        sessionStorage.setItem("yonghus", JSON.stringify(yonghu))
                    }
                })
            }

            var time;
            $(".huoyan").on("click", function () {
                var A = $("#yph").val()
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (A == "") {
                    layer.msg("请输入预留手机号码", {time: 2000});
                    $(".donghua").hide()
                    return
                } else if (!reg.test(A)) {
                    layer.msg("请输入正确手机号码", {time: 2000});
                    return
                }

                var yinhangkass = JSON.parse(sessionStorage.getItem("yinhangkas"));
                var yonghu = JSON.parse(sessionStorage.getItem("yonghus"))
                if (!yinhangkass || !yonghu) {
                    layer.msg("确认银行卡信息", {time: 2000});
                    return
                }

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


                    var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
                    getSwiperData()
                    function getSwiperData() {
                        var r = ["bindBankCard",
                            {
                                "user_name": yonghu.username,
                                "id_number": yonghu.idnumber,
                                "cardno": yinhangkass.kahao,
                                "phone": $("#yph").val(),
                                "bankcode": yinhangkass.kaying,        //银行代码
                                "bankname": yinhangkass.kaming         //银行名称
                            }];
                        var json = api.JsonpArr(r);
                        api.call(json, api_url).done(function (rs) {
                            $(".donghua").hide();
                            if (rs.error) {
                                clearInterval(time);
                                $(".huoyan").html("重新发送");
                                $(".huoyan").css("color", "#D8AA5A");
                                Component.render().error(rs.error);
                            } else {
                                sessionStorage.setItem("requestid", rs.result.requestid)
                            }
                        });
                    }
                }

            })


            $(".jiaka").on("click", function () {
                $(".donghua").show()
                if (!$(".aaaaa")) {
                    layer.msg("请获取验证码", {time: 2000});
                    return
                }
                if ($("#kahao").val() == "") {
                    layer.msg("请输入银行卡号码", {time: 2000});
                    return
                }
                if ($(".yanzhengs").val() == "") {
                    layer.msg("请输入预留手机号码验证码", {time: 2000});
                    return
                }
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
                getSwiperDatas()
                function getSwiperDatas() {
                    var r = [
                        "confirmBandCard",
                        {
                            "requestid": sessionStorage.getItem("requestid"),
                            "validCode": $(".yanzhengs").val()
                        }
                    ];
                    var json = api.JsonpArr(r);

                    api.call(json, api_url).done(function (rs) {
                        $(".donghua").hide();
                        if (rs.error) {
                            clearInterval(time);
                            $(".huoyan").html("重新发送");
                            $(".huoyan").css("color", "#D8AA5A");
                            Component.render().error(rs.error);
                        }else {
                            layer.msg("添加银行卡成功", {time: 2000});
                            window.location.href = "#yinhangkashezhi"
                        }
                    })
                }
            })
        }

        return {
            render: render
        }
    })