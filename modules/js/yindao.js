define(["jquery",
        "swiper",
        "./publicComponent.js?time="+new Date(),
        "public",
        "text!../str/yindao.html?time="+new Date(),
        "css!../css/yindao.css?time="+new Date(),
        "css!../css/swiper-3.3.1.min.css"
    ],
    function ($, swiper, Component, mc, html) {
        function render() {
            $(".main").html(html);
            $("#YSF-BTN-HOLDER").hide();
            $("#YSF-CUSTOM-ENTRY-3").hide();
            $(".footers").hide()
            new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                //点击圆点切换
                paginationClickable: true,
                //滑动速度，即slider自动滑动开始到结束的时间（单位ms）
                speed: 600,
                onSlideChangeStart: function (swiper) {
                    if (swiper.activeIndex == 2) {
                        $(".swiper-pagination").hide()
                    } else {
                        $(".swiper-pagination").show()
                    }
                }
            });
            var rule;
            if (window.location.href.indexOf("?") < 0) {
                rule = 3;
            } else {
                rule = window.location.href.split("?")[1].split("road=")[1]
            }
            localStorage.setItem("rule", rule)
            var _hmt = _hmt || [];
            (function () {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?2d3bbffec85b998796a37b2bb7224d9c";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            $(".start").on("click", function () {
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
                getSwiperData();
                function getSwiperData() {
                    var r = ["loginStatus"];
                    var json = api.JsonpArr(r);
                    api.call(json, api_url).done(function (rs) {
                        $(".donghua").hide();
                        if (rs.error) {
                            Component.render().error(rs.error);
                        } else {
                            $(".donghua").hide();
                            //点击的时候 改变其 消失效果
                            $(".start").parent().animate({
                                "width": "700px",
                                "marginLeft": "-147px",
                                "height": "1200px",
                                "marginTop": "-254px",
                                "opacity":"0"
                            },1000)
                            setTimeout(function(){
                                if (rs.result.status == 0) {
                                    window.location.href = "#zhucezhang"
                                } else {
                                    window.location.href = "#jiekuanzhu"
                                }
                            },600)

                        }
                    })
                }
            })
        }

        return {
            render: render
        }
    })
