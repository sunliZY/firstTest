define(["jquery", "./publicComponent.js?time="+new Date(), "public", "layer",
        "text!../str/mineZH.html?time=" + new Date(), "css!../css/mineZH.css?time=" + new Date(), "css!../css/layer.css"],
    function ($, Component, mc, layer, html) {
        function render() {
            $(".main").html(html);
            $(".donghua").show();
            $(".wechats").on("click", function () {
                layer.msg("公众号已复制，去微信搜索添加", {time: 2000});
            });
            $(".wechats").find("span").eq(2).css("color", "#CC9F68");

            getSwiperData();

        }

        //判断是否登录 显示用户信息
        function getSwiperData() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/index.php?c=first";
            var r = ["index", {}];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    if (rs.result.data.isLogin == 0) {
                        window.location.href = "#zhucezhang"
                    } else {
                        var name = rs.result.data.user_name.substring(0, 1) + "**"
                        $(".headers dl dd").find("p").eq(0).html(name)
                        var phone = rs.result.data.phone.substring(0, 3) + "****" + rs.result.data.phone.substring(7)
                        $(".headers dl dd").find("p").eq(1).html(phone);
                        getSwiperDatas()
                    }
                }
            })
        }

        //判断是否添加银行卡
        function getSwiperDatas() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
            var r = ["bankCradList"];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    if (rs.error.message == "没有银行卡号，请前去添加！") {

                    }
                    else {
                        Component.render().error(rs.error);
                    }
                } else {
                    var len = rs.result.data[0].bank_card
                    var lens = len.substring((len.length - 4), len.length)
                    var str = rs.result.data[0].bank_name + "(" + lens + ")"
                    $(".ullist  li").eq(1).find("span").eq(2).css("color", "#CC9F68")
                    $(".ullist  li").eq(1).find("span").eq(2).html(str)
                    sessionStorage.setItem("hao", rs.result.data[0].bank_card)
                }
            })
        }

        return {
            render: render
        }
    })
