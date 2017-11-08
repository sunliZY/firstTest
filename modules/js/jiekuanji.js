define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public", "layer", "touch",
        "text!../str/huankuan.html?time="+new Date(), "css!../css/huankuan.css?time="+new Date(), "css!../css/layer.css"],
    function ($, Component,headers,mc, layer, touch, html) {
        function render() {
            $(".main").html(html);
            headers.render("借款记录");
            $(".main").css("height", "100%")
            $(".donghua").show()
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";

            getSwiperDatat(1)
            function getSwiperDatat(num) {
                var r = [
                    "loanList",
                    {
                        "page": num          //当前页
                    }
                ];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        var data = rs.result.data;
                        if (data.length > 0) {
                            $(".noImg").hide()

                        } else {
                            $(".titls").hide()
                        }

                        if (data.length >= 7) {
                            $(".main").css("height", "auto")
                        }
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].order_status_name == "待还款") {
                                str = `
                    <li>
                        <span>${data[i].create_time}</span>
                        <span>${data[i].amount}</span>
                        <span class='weihu'>
                         <mark>${data[i].order_status_name}</mark>
                            <i>${data[i].borrow_id}</i>
                            <em><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></em>
                        </span>
                    </li>
                     `;
                            } else if (data[i].order_status_name == "已还款" || data[i].order_status_name == "订单取消" || data[i].order_status_name == "还款失败") {
                                str = `
                    <li>
                        <span>${data[i].create_time}</span>
                        <span>${data[i].amount}</span>
                       <span class='yihu'>
                         <mark>${data[i].order_status_name}</mark>
                        <i>${data[i].borrow_id}</i>
                        <em><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></em>
                    </span>
                </li>`
                            } else {
                                str = `<li>
                    <span>${data[i].create_time}</span>
                    <span>${data[i].amount}</span>
                    <span >
                        <mark>${data[i].order_status_name}</mark>
                        <i>${data[i].borrow_id}</i>
                        <em><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></em>
                    </span>
                    </li>
                    `
                            }
                            $(".ulsi").append($(str))
                            $(".ulsi").css(" padding-bottom", "3rem;")
                        }
                        var startx, starty;
                        //获得角度
                        function getAngle(angx, angy) {
                            return Math.atan2(angy, angx) * 180 / Math.PI;
                        };

                        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
                        function getDirection(startx, starty, endx, endy) {
                            var angx = endx - startx;
                            var angy = endy - starty;
                            var result = 0;

                            //如果滑动距离太短
                            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                                return result;
                            }

                            var angle = getAngle(angx, angy);
                            if (angle >= -135 && angle <= -45) {
                                result = 1;
                            } else if (angle > 45 && angle < 135) {
                                result = 2;
                            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                                result = 3;
                            } else if (angle >= -45 && angle <= 45) {
                                result = 4;
                            }

                            return result;
                        }

                        //手指接触屏幕
                        $(".ulsi").on('touchstart', function (e) {
                            startx = e.originalEvent.changedTouches[0].pageX;
                            starty = e.originalEvent.changedTouches[0].pageY;
                        });
                        //手指离开屏幕
                        $(".ulsi").on("touchend", function (e) {
                            var endx, endy;
                            endx = e.originalEvent.changedTouches[0].pageX;
                            endy = e.originalEvent.changedTouches[0].pageY;
                            var direction = getDirection(startx, starty, endx, endy);
                            switch (direction) {
                                case 0:
                                    break;
                                case 1:
                                    var otp = $(window).scrollTop()
                                    var tops = $(".ulsi").outerHeight() - $(".conts").outerHeight() + $(".head").outerHeight()
                                    if (otp >= tops + 50) {
                                        $(".donghua").show()
                                        $(".tishi").html("上拉加载")
                                        setTimeout(function () {
                                            $(".tishi").html("加载中...")
                                        }, 500)
                                        num++;
                                        if (num <= Math.ceil(rs.result.total_item / 20)) {
                                            setTimeout(function () {
                                                $(window).scrollTop($(".ulsi").outerHeight())
                                                getSwiperDatat(num);
                                                $(".ulsi").unbind('touchstart');
                                            }, 1500)
                                        } else {
                                            $(".tishi").html("无数据")
                                            setTimeout(function () {
                                                $(".tishi").html("无数据")
                                            }, 500)
                                            setTimeout(function () {
                                                $(".donghua").hide()
                                            }, 1000)
                                        }
                                    }
                                    break;
                                case 2:
                                    break;
                                case 3:
                                    break;
                                case 4:
                                    break;
                                default:
                            }
                        });



                        $(".ulsi").on("click", "li", function () {
                            $(".main").css("height", "100%")
                            if ($(this).find("span").hasClass("weihu")) {
                                window.location.href = '#lijihuankuan?id=' + $(this).find("i").html()
                                window.event.returnValue = false
                            } else {
                                window.location.href = '#huankuanjilu?id=' + $(this).find("i").html()
                                window.event.returnValue = false
                            }
                        })

                    }
                })
            }
        }

        return {
            render: render
        }
    })
