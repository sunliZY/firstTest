define(["jquery", "./publicComponent.js?time="+new Date(), "./headers.js?time="+new Date(), "public", "layer", "md5",
        "text!../str/jiekuanxinxi.html?time=" + new Date(), "css!../css/jiekuanxinxi.css?time=" + new Date(), "css!../css/layer.css"
    ],
    function ($, Component, headers, mc, layer, md5, html) {
        function render() {
            $(".main").html(html);
            headers.render("确认借款信息");
            Component.render().check();
            //渲染页面数据
            getSwiperData();
            //判断是否绑定银行卡
            getSwiperDatas();

            $(".coupon_info").on("click", function () {
                var money = JSON.parse(localStorage.getItem("jiekuanxis"));
                window.location.href = "#coupon?canal=money&money=" + money.daozhang + "&time=" + money.shijian + "&couponMonet=0&couponId=0&couponTime=0";
            })
        }

        function getSwiperData() {
            $(".donghua").show();
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            var money = JSON.parse(localStorage.getItem("jiekuanxis"));
            $(".ullist li").eq(0).find("span").eq(1).html(money.daozhang + "元")
            $(".ullist li").eq(1).find("span").eq(1).html(money.shijian + "天")
            $(".ullist li").eq(2).find("span").eq(1).html(money.daozhang + "元")
            var r = [
                "tollRate",
                {
                    "amount": money.daozhang,
                    "borrow_cycle": money.shijian
                }
            ];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    $(".conts p").eq(0).find("span").eq(1).html(rs.result.data.monthly);   //月利息
                    $(".conts p").eq(1).find("span").eq(1).html();  //月化利率
                    $(".zong").find("i").html(rs.result.data.sumfee);  //总计
                    $(".conts ol li").eq(0).find("span").eq(1).html(Number(rs.result.data.riskservicefee).toFixed(2) + "元"); //风控服务费
                    $(".conts ol li").eq(1).find("span").eq(1).html(Number(rs.result.data.platfee).toFixed(2) + "元");//平台服务费
                    $(".conts ol li").eq(4).find("span").eq(1).html(Number(rs.result.data.capitalfee).toFixed(2) + "元");//资金费用
                    $(".conts ol li").eq(2).find("span").eq(1).html(Number(rs.result.data.collectionfee).toFixed(2) + "元");//催收服务费
                    $(".conts ol li").eq(3).find("span").eq(1).html(Number(rs.result.data.riskreserve).toFixed(2) + "元");//风险服务费
                    var ISiosAnH5s = ISiosAnH5();
                    //window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMonet="+localStorage.getItem("couponMonet")+"&couponId="+localStorage.getItem("couponId");
                    //判断是否选择优惠券l
                    if (ISiosAnH5s.couponMoney == "00000" ||
                        ISiosAnH5s.couponMoney * 1 > ISiosAnH5s.money * 1 ||
                        ISiosAnH5s.couponTime * 1 > ISiosAnH5s.time * 1
                    ) {
                        $(".coupon_info span").eq(2).html("未选择");
                        //$(".coupon_info span").eq(2).css("color","#AAA");
                    } else {
                        $(".coupon_info span").eq(2).html("已选择");
                        //$(".coupon_info span").eq(2).css("color","#DA3B3B");
                        $(".coupon_info span").eq(1).find("b").html("-" + ISiosAnH5s.couFee + "元");
                    }
                }
            })
        }

        function getSwiperDatas() {
            $(".donghua").show();
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
            var r = ["bankCradList"];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    var len = rs.result.data[0].bank_card;
                    var lens = len.substring((len.length - 4), len.length);
                    var str = rs.result.data[0].bank_name + "(" + lens + ")";
                    $(".ullist li").eq(3).find("span").eq(1).html(str);
                    sessionStorage.setItem("hao", rs.result.data[0].bank_card);
                    //点击借款按钮
                    methods();
                }
            })
        }

        function methods() {
            $(".InLoan").on("click", function () {
                if (!sessionStorage.getItem("hao")) {
                    layer.msg("请绑定银行卡", {
                        time: 2000
                    });
                    window.location.href = "#yinhangkashezhi";
                } else {
                    getSwiperDatass();
                }
            })
            //onclick="window.location.href='#coupon?coupons=coupon'"
        }

        function getSwiperDatass() {
            if ($(".coupon_info span").eq(2).html() != "请选择") {
                $(".donghua").show();
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
                var money = JSON.parse(localStorage.getItem("jiekuanxis"));
                var r = [
                    "makeOrder",
                    {
                        "amount": money.daozhang, //借款金额
                        "borrow_cycle": money.shijian, //借款周期
                        "bank_card": sessionStorage.getItem("hao"), //银行卡号
                        "longitude": "0", //经度
                        "latitude": "0", //纬度
                        "accuracy": "0", //精度
                        "altitude": "0", //海拔高度
                        "couponId": ISiosAnH5().couponId //用户优惠券自增ID 不参与活动为0
                    }
                ];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        window.location.href = "#jiekuanzhong";
                    }
                })
            } else {
                $(".donghua").show();
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
                var money = JSON.parse(localStorage.getItem("jiekuanxis"));
                var r = [
                    "makeOrder",
                    {
                        "amount": money.daozhang, //借款金额
                        "borrow_cycle": money.shijian, //借款周期
                        "bank_card": sessionStorage.getItem("hao"), //银行卡号
                        "longitude": "0", //经度
                        "latitude": "0", //纬度
                        "accuracy": "0", //精度
                        "altitude": "0", //海拔高度
                        "couponId": "0" //用户优惠券自增ID 不参与活动为0
                    }
                ];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        window.location.href = "#jiekuanzhong";
                    }
                })
            }
        }

        function ISiosAnH5() {
            if (window.location.href.split("?")[1] != undefined) {
                var Url = window.location.href.split("?")[1].split("&");
                var lacationObj = {};
                for (var i = 0; i < Url.length; i++) {
                    var ks = Url[i].split("=");
                    lacationObj[ks[0]] = ks[1]
                }
                return lacationObj;
            }
        }

        return {
            render: render
        }
    })
