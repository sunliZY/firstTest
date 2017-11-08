define(["jquery", "./publicComponent.js?time="+new Date(), "touch",
        "./tankuang", "public", "./rule", "swiper", "iscroll", "layer",
        "text!../str/jiekuanzhu.html?time="+new Date(),
        "css!../css/jiekuanzhu.css?time="+new Date(),
        "css!../css/swiper-3.3.1.min.css",
        "css!../css/layer.css"
    ],
    function ($, Component, touch, tankuang, mc, rule, swiper, iscroll, layer, html) {
        function render() {
            //引入页面
            $(".main").html(html);
            $(".footers").show();
            Footer();
            //消息
            IsInform();
            //引导下载App
            if (!localStorage.getItem("tankuang")) {
                tankuang.render();
                localStorage.setItem("tankuang", "tankuang")
            }
            //获取唯一标识
            Identification();
            $(".donghua").show();
            //判断所有的基本信息
            //是否授信等 授信到哪里
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/index.php?c=first";
            var everydata = {}
            getSwiperData()

            function getSwiperData() {
                var r = ["index", {}];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        everydata = rs.result.data;
                        if (everydata.remain_amount == "") {
                            everydata.remain_amount = 0
                        }
                        //显示认证到第几步
                        if (everydata.credit_status == 2) {
                            $(".renzheng").html("认证失败")
                        } else if (everydata.information_step == 3 && everydata.credit_status == 1) {
                            $(".renzheng").html("立即借款")
                            $(".ka").css("background", "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/zhu1.png') center")
                            $(".ka").css("background-size", "cover")
                        } else if (everydata.information_step == 3) {
                            $(".renzheng").html("审核中")
                        } else {
                            $(".renzheng i strong").html(everydata.information_step)
                        }
                        //如果信用额度为0
                        if (everydata.credit_amount == 0 && everydata.remain_amount == 0) {
                            everydata.credit_amount = 1000;
                        }
                        //是否登录  根据登录状态 显示不一样
                        if (everydata.isLogin == 0) {
                            $(".div").css("display", "none")
                            var str = `
                                <span>500</span>
                                <span>借款金额/元</span>
                                <span class="r1">1000</span>
                              `
                            var strs = `
                                    <span>7</span>
                                    <span>借款天数/天</span>
                                    <span class="r2">30</span>
                            `
                            $(".ds").html(str);
                            $(".dss").html(strs);
                            $(".xian span").html("");
                            $(".xians span").html("");
                            $(".xians i").html("30");
                            $(".r1").html(everydata.credit_amount);
                        } else {
                            $(".div").css("display", "block");
                            //金额滑块下面的最大额度
                            $(".r1").html(everydata.credit_amount + "元");
                        }
                        //根据额度 来显示不一样的卡的颜色
                        if (3000 <= everydata.credit_amount && 5000 > everydata.credit_amount) {
                            $(".ka").css("background", "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/zhu2.png') center")
                            $(".ka").css("background-size", "cover");
                        }
                        if (5000 <= everydata.credit_amount) {
                            $(".ka").css("background", "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/zhu3.png') center")
                            $(".ka").css("background-size", "cover");
                        }
                        //滑块上方 金额显示
                        $(".xian i").html(everydata.credit_amount);
                        //显示信用额度
                        $(".ka .ulsw .t").eq(1).html(everydata.credit_amount);
                        //到账金额
                        $(".content .uls li").eq(1).find("i").html(everydata.credit_amount);
                        //显示可借额度
                        $(".ka .ulsw .t").eq(0).html(everydata.remain_amount);
                        //显示银行卡号
                        $(".ka ol li").eq(0).html(everydata.card.number);
                        //显示借款次数
                        $(".ka ol li").eq(1).find("i").html(everydata.borrowSuccessNum);
                        //利息
                        var lixi = getInterect(($(".xian i ").html() * 1), ($(".xians i").html() * 1)) + "元"
                        $(".content .uls li").eq(0).find("span").eq(1).html(lixi);

                        function getInterect(money, day) {
                            return (money * (everydata.rate / 30) * day).toFixed(2);
                        }

                        //显示综合费用
                        $(".content .uls li").eq(0).find("span").eq(1).html(lixi);
                        $(".donghua").hide();
                        //进度条 滑动
                        Progress(everydata);
                    }
                });
            }

            $(".ka").on("click", function () {
                renzheng();
            })
            $(".shenjie").on("click", function () {
                renzheng(this);
            })

            function renzheng(that) {
                var jiekuanxi = {
                    daozhang: $(".content .uls li").eq(1).find("span").eq(1).find("i").html(),
                    shijian: $(".xians i").html(),
                    lixi: $(".content .uls li").eq(0).find("span").eq(1).html()
                }
                if (everydata.credit_status == 1) {
                    localStorage.setItem("jiekuanxis", JSON.stringify(jiekuanxi));
                    if ($(".content .uls li").eq(1).find("i").html() * 1 <= everydata.remain_amount * 1) {
                        if(localStorage.getItem("couponMoney") && localStorage.getItem("couponId") && localStorage.getItem("couponTime")){

                            if(jiekuanxi.daozhang*1<localStorage.getItem("couponMoney")*1 ||
                                jiekuanxi.shijian*1<localStorage.getItem("couponTime")*1
                            ){
                                IsCoupon(jiekuanxi);
                            }else{
                                window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMoney="+localStorage.getItem("couponMoney")+"&couponId="+localStorage.getItem("couponId")+"&couponTime="+localStorage.getItem("couponTime")+"&couFee="+localStorage.getItem("couFee");
                            }
                        }else{
                            window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMoney=00000&couponId=0&couponTime=0&couFee=0";
                        }
                    } else {
                        layer.msg("可借额度不足", {time: 2000});
                    }
                    //window.location.href = "#jiekuanxinxi"
                } else if (everydata.credit_status == 0) {
                    if (everydata.information_step == 0) {
                        if (that) {
                            $(".renzhengs").show()
                            $(".renzhengs .lists span").eq(0).on("click", function () {
                                $(".renzhengs").hide()
                            })
                            $(".renzhengs .lists span").eq(1).on("click", function () {
                                $(".renzhengs").hide()
                                window.location.href = "#renzhengshiming"
                            })
                        } else {
                            window.location.href = "#renzhengshiming"
                        }
                    } else if (everydata.information_step == 1) {
                        window.location.href = "#renzhenggeren"
                    } else if (everydata.information_step == 2) {
                        window.location.href = "#renzhengshouji"
                    } else if (everydata.information_step == 3) {
                        if (everydata.credit_status != 1) {
                            window.location.href = "#shenhez"
                        } else {
                            if ($(".content .uls li").eq(1).find("i").html() * 1 <= everydata.remain_amount * 1) {

                                if(localStorage.getItem("couponMoney") && localStorage.getItem("couponId") && localStorage.getItem("couponTime")){
                                    if(jiekuanxi.daozhang*1<localStorage.getItem("couponMoney")*1 ||
                                        jiekuanxi.shijian*1<localStorage.getItem("couponTime")*1

                                    ){
                                        IsCoupon(jiekuanxi);
                                    }else{
                                        window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMoney="+localStorage.getItem("couponMoney")+"&couponId="+localStorage.getItem("couponId")+"&couponTime="+localStorage.getItem("couponTime")+"&couFee="+localStorage.getItem("couFee");
                                    }
                                }else{
                                    window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMoney=00000&couponId=0&couponTime=0";
                                }
                            } else {
                                layer.msg("可借额度不足", {time: 2000});
                            }
                        }
                    }
                    /*else if(everydata.information_step == 4) {
                     if(everydata.credit_status != 1) {
                     window.location.href = "#shenhez"
                     } else {
                     window.location.href = "#jiekuanxinxi"
                     }
                     }*/
                } else if (everydata.credit_status == 2) {
                    $(".renzheng").html("认证失败");
                    window.location.href = "#shenhes";
                }
            }
        }



        function IsCoupon(jiekuanxi) {
            $(".outbox").show();
            $(".outbox .think").on("click",function () {
                $(".outbox").hide();
            })
            $(".outbox .go_next").on("click",function () {
                $(".outbox").hide();
                window.location.href = "#jiekuanxinxi?money="+jiekuanxi.daozhang+"&time="+jiekuanxi.shijian+"&couponMoney=00000&couponId=0&couponTime=0";
            })
        }

        function IsInform() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/index.php?c=first";
            //获取是否有消息通知
            getSwiperDatauu();

            function getSwiperDatauu() {
                var r = ["newNotice"];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        if (!rs.result.data.notice_status) {
                        } else {
                            $(".header .inform img").attr("src", "https://imagecdn.xinyongjinku.com/wechat/modules/images/weidu@v1.1.1.png")
                        }
                    }
                })
            }

            //点击查看通知列表
            $(".inform").on("click", function () {
                window.location.href = "#inform"
            })
        }
        //生成同盾的唯一 ID
        function Identification() {
            if (localStorage.getItem("tokenId")) {
                $tokenId = localStorage.getItem("tokenId")
            } else {
                var $tokenId = 'wanglibank' + "-" + new Date().getTime() + "-" + (Math.random() * 1000).toString(16).substr(2);
                localStorage.setItem("tokenId", $tokenId)
            }
            _fmOpt = {
                partner: 'wanglibank',
                appName: 'wanglibank_web',
                token: $tokenId
            };
            var cimg = new Image(1, 1);
            cimg.onload = function () {
                _fmOpt.imgLoaded = true;
            };
            var tokenId = 'wanglibank' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2);
            cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=wanglibank&appName=wanglibank_web&tokenId=" + _fmOpt.token;
            var fm = document.createElement('script');
            fm.type = 'text/javascript';
            fm.async = true;
            fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime() / 3600000).toFixed(0);
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(fm, s);
        }

        function Progress(everydata) {
            $(".huakuai").on('touchstart', function (e) {
                var touch = e.originalEvent.changedTouches[0];
                var startL = touch.pageX
                var startX = Math.round($(".huakuai").offset().left - $(".jindutiao").offset().left)
                $(".huakuai").on("touchmove", function (e) {
                    var touch = e.originalEvent.changedTouches[0];
                    var moveL = touch.pageX
                    var moveX = moveL - startL
                    var width = (startX * 1 + moveX * 1)
                    var position = width + 3 * 1
                    var xian;
                    xian = Math.round(500 * 1 + (((everydata.credit_amount * 1 - 500) / ($(".jindutiao").width() * 1)) * (width * 1)))
                    if (xian < 490) {
                        $(".huakuai").css("left", "-2px")
                    } else if (xian < (everydata.credit_amount * 1 - (((everydata.credit_amount * 1 - 500) / ($(".jindutiao").width() * 1)) * 15))) {
                        $(".huakuai").css("left", width + "px")
                        $(".xian").css("left", (width - 10) + "px")
                        $(".jindutiaos").css("width", position + "px")
                    }
                    rule.render(xian, everydata);
                    //利息
                    var lixi = getInterect(($(".xian i ").html() * 1), ($(".xians i").html() * 1)) + "元";
                    $(".content .uls li").eq(0).find("span").eq(1).html(lixi);

                    function getInterect(money, day) {
                        return (money * (everydata.rate / 30) * day).toFixed(2);
                    }

                    $(".huakuai").on("touchend", function () {
                        $(".huakuai").unbind('mousemove');
                        if ($(".xian i").html() <= 740) {
                            $(".xian i").html("500");
                            $(".content .uls li").eq(1).find("i").html("500");
                            $(".huakuai").css("left", "-0.25rem");
                            $(".xian").css("left", "-0.5625rem");
                            $(".jindutiaos").css("width", "0px");
                            //利息
                            var lixi = getInterect(($(".xian i ").html() * 1), ($(".xians i").html() * 1)) + "元";
                            $(".content .uls li").eq(0).find("span").eq(1).html(lixi);
                        } else if ($(".xian i").html() >= 740 && $(".xian i").html() <= 1000) {
                            if(everydata.credit_amount * 1>1000){

                            }else{
                                $(".xian i").html("1000");
                                $(".content .uls li").eq(1).find("i").html("1000");
                                $(".huakuai").css("left", "17.5rem");
                                $(".xian").css("left", "16.7rem");
                                $(".jindutiaos").css("width", "18rem");
                            }
                            //利息
                            var lixi = getInterect(($(".xian i ").html() * 1), ($(".xians i").html() * 1)) + "元";
                            $(".content .uls li").eq(0).find("span").eq(1).html(lixi);
                        }
                    })
                })
            })
            $(".huakuais").on("touchstart", function (e) {
                var touch = e.originalEvent.changedTouches[0];
                var startL = touch.pageX
                var startX = Math.round($(".huakuais").offset().left - $(".jindutiao").offset().left)
                $(".huakuais").on("touchmove", function (e) {
                    var touch = e.originalEvent.changedTouches[0];
                    var moveL = touch.pageX
                    var moveX = moveL - startL
                    var width = (startX * 1 + moveX * 1)
                    var position = width + 3 * 1
                    var xian = Math.round(7 * 1 + ((26 / ($(".jindutiao").width() * 1)) * (width * 1)))
                    if (xian > 31 || xian < 7) {
                    } else {
                        $(".xians i").html(xian)
                        $(".huakuais").css("left", width + "px")
                        $(".xians").css("left", (width - 10) + "px")
                        $(".jindutiaoss").css("width", position + "px")
                    }
                    if (xian < 7) {
                        $(".xians i").html("7")
                    } else if (xian > 30) {
                        $(".xians i").html("30")
                    }
                    //利息
                    var lixi = getInterect(($(".xian i ").html() * 1), ($(".xians i").html() * 1)) + "元"
                    $(".content .uls li").eq(0).find("span").eq(1).html(lixi)

                    function getInterect(money, day) {
                        return (money * (everydata.rate / 30) * day).toFixed(2);
                    }

                    $(".huakuais").on("touchend", function () {
                        $(".huakuais").unbind('mousemove');
                    })
                })
            })
        }

        function Footer() {
            //定义所有背景图片的路径
            var aImagesSrc = [
                ["https://imagecdn.xinyongjinku.com/wechat/modules/images/jiekuan_icon@v1.1.0.png", "https://imagecdn.xinyongjinku.com/wechat/modules/images/jiekuan_icon1@v1.1.0.png"
                ],
                ["https://imagecdn.xinyongjinku.com/wechat/modules/images/huankuan_icon@v1.1.0.png", "https://imagecdn.xinyongjinku.com/wechat/modules/images/huankuan_icon1@v1.1.0.png"
                ],
                ["https://imagecdn.xinyongjinku.com/wechat/modules/images/jinku_cion@v1.1.0.png", "https://imagecdn.xinyongjinku.com/wechat/modules/images/jinku_cion1@v1.1.0.png"
                ],
                ["https://imagecdn.xinyongjinku.com/wechat/modules/images/wode_icon@v1.1.0.png", "https://imagecdn.xinyongjinku.com/wechat/modules/images/wode_icon1@v1.1.0.png"
                ]
            ]
            fnBackground()

            //设置背景图片
            function fnBackground() {
                for (var i = 0; i < $(".footers a").length; i++) {
                    $(".footers p").eq(i).css({
                        "background": "url('" + aImagesSrc[i][0] + "')",
                        "background-size": "cover"
                    })
                }
            }

            $(".footers a").eq(0).addClass("clicked").siblings().removeClass("clicked")
            $(".footers p").eq(0).css({
                "background": "url('" + aImagesSrc[0][1] + "')",
                "background-size": "cover"
            })
        }

        return {
            render: render
        }
    })