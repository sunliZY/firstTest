define(["jquery", "swiper", "./publicComponent.js?time="+new Date(), "layer", "public", "./headers.js?time="+new Date(), "text!../str/coupon.html?time=" + new Date(), "css!../css/coupon.css?time=" + new Date(), "css!../css/swiper-3.3.1.min.css", "css!../css/layer.css"],
    function ($, swiper, Component, layer, mc, headers, html) {
        function render() {
            $(".main").html(html);
            headers.render("优惠券");
            $(".header").addClass("rules");
            //渲染页面列表
            renderings();
        }

        function renderings() {
            Rendering(1);
            Rendering(2);
            Rendering(3);
            setTimeout(function () {
                methods()
            }, 500);
            //swiper 选项卡效果
            swiPer();
        }

        function Rendering(num) {
            $(".donghua").show();
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
            var r = [
                "userCoupon",
                {
                    "type": num       //借款Id
                }
            ];
            var json = api.JsonpArr(r);
            // console.log(json);
            api.call(json, api_url).done(function (rs) {
               // console.log(rs);
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    var data = rs.result.data;

                    if (data == "" || !data) {
                        $(".swiper-wrapper .swiper-slide").eq(num - 1).append("<div class='imgIcon'><img src='https://imagecdn.xinyongjinku.com/wechat/modules/images/nokaquan@V1.1.8.png'/><span>您还没有优惠券</span></div>");
                    } else {
                        //$(".swiper-wrapper .swiper-slide").html("");
                        //是否符合条件使用
                        if (num == 1) {
                            //var ss=`<div class="NoleMyi liji_use" couponid="100000" amount='100000' coupontime="100000" coufee="100000"><span>暂不使用优惠券</span><span></span><span><i>√</i></span></div>`
                            //$(".swiper-wrapper .swiper-slide").eq(0).prepend(ss);
                            for (var i = 0; i < data.length; i++) {
                                var str = `<div class="Ctext"><div class="type">
                                            <p><span>￥</span><span>${data[i].coupon_info.amount}</span></p>
                                            <p>${data[i].coupon_info.type_name}</p>
                                        </div>
                                        <div class="moneyTime">
                                            <p>${data[i].coupon_info.coupon_desc}</p>
                                            <p>有效期至${data[i].end_time}</p>
                                        </div>
                                        <div class="liji_use" couponid="${data[i].id}" amount='${data[i].coupon_info.amount}' coupontime="${data[i].coupon_info.days}" coufee="${data[i].coupon_info.cou_fee}">
                                           <span >立<br>即<br>使<br>用<br></span>
                                        </div></div>`
                                $(".swiper-wrapper .swiper-slide").eq(0).append(str);
                            }
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                var str = `
                                   <div class="Ctext CtextS">
                                    <div class="type">
                                        <p><span>￥</span><span>${data[i].coupon_info.amount}</span></p>
                                        <p>${data[i].coupon_info.type_name}</p>
                                    </div>
                                    <div class="moneyTime">
                                        <p>${data[i].coupon_info.coupon_desc}</p>
                                        <p>有效期至${data[i].end_time}</p>
                                    </div>
                                    <div class="isUse ISuserone">
                                       <img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/yiguoqi@V1.1.8.png" alt="">
                                    </div>
                                    <div class="isUse ISuserwwo">
                                       <img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/yishiyong@v1.1.8.png" alt="">
                                    </div>
                                  </div>`
                                $(".swiper-wrapper .swiper-slide").eq(num - 1).append(str);
                            }

                            if (num == 2) {
                                $(".swiper-wrapper .swiper-slide").eq(1).find(".ISuserone").hide();
                            } else {
                                $(".swiper-wrapper .swiper-slide").eq(2).find(".ISuserwwo").hide();
                            }
                        }
                    }


                }
            })
        }

        function methods() {

            $(".useRule").click(function () {
                $(".useOut").show();
            })
            $(".remo").click(function () {
                $(".useOut").hide();
            })

            $(".liji_use").on("click", function () {
                localStorage.setItem("couponId", $(this).attr("couponid"));
                localStorage.setItem("couponMoney", $(this).attr("amount"));
                localStorage.setItem("couponTime", $(this).attr("coupontime"));
                localStorage.setItem("couFee", $(this).attr("coufee"));

                var ISISiosAnH5s = ISiosAnH5();
                if (ISISiosAnH5s.canal == "home") {
                    if($(this).hasClass("NoleMyi")) {
                    }else{
                        layer.msg("领取成功", {time: 2000});
                    }
                    window.location.href = "#jiekuanzhu";
                } else {
                    if (ISISiosAnH5s.money * 1 < $(this).attr("amount") * 1 ||
                        ISISiosAnH5s.time * 1 < $(this).attr("coupontime") * 1
                    ) {
                        if($(this).hasClass("NoleMyi")){
                            window.location.href = "#jiekuanxinxi?money=0&time=0&couponMoney=00000&couponId=0&couponTime=0&couFee=0";
                        }else{
                            $(".outbox").show();
                            $(".outbox .think").on("click",function () {
                                $(".outbox").hide();
                            })
                            $(".outbox .go_next").on("click",function () {
                                $(".outbox").hide();
                                window.location.href = "#jiekuanxinxi?money=0&time=0&couponMoney=00000&couponId=0&couponTime=0&couFee=0";
                            })
                        }
                    } else {
                        layer.msg("领取成功", {time: 2000});
                        window.location.href = "#jiekuanxinxi?money=" + ISISiosAnH5s.money + "&time=" + ISISiosAnH5s.time + "&couponMoney=" + $(this).attr("amount") + "&couponId=" + $(this).attr("couponid") + "&couponTime=" + $(this).attr("coupontime") + "&couFee=" + $(this).attr("coufee");

                    }
                }
            })

        }

        function swiPer() {
            var mySwiper = new Swiper('.contents', {
                onSlideChangeEnd: function (swiper) {
                    var j = mySwiper.activeIndex;
                    //Rendering((j*1)+(1*1));
                    $('.list ul li').eq(j).find('span').addClass('sideline').parent().siblings().find('span').removeClass('sideline');
                }
            })
            /*列表切换*/
            $('.list ul li').on('click', function (e) {
                e.preventDefault();
                //得到当前索引
                var i = $(this).index();
                //Rendering((i*1)+(1*1));
                $(this).find('span').addClass('sideline').parent().siblings().find('span').removeClass('sideline');
                mySwiper.slideTo(i, 1000, false);
            });
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
