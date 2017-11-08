define(["jquery","public", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "text!../str/inform.html?time="+new Date(), "css!../css/inform.css?time="+new Date()],
    function ($,mc, Component,headers, html) {
        function render() {
            $(".main").html(html);
            headers.render("通知");

            var api_url = Component.render().use() + ".xinyongjinku.com/passport/index.php?c=first";

            /*if(sessionStorage.getItem("num")){
             var test = sessionStorage.getItem("num")
             }else{
             alert(111)
             getSwiperDatat(1)
             }*/

            getSwiperDatat(1)
            function getSwiperDatat(num) {
                var r = [
                    "noticeList",
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
                        if (data == '暂无通知') {
                            $(".noImg").show();
                            $(".list_new").hide();

                        } else {
                            if (data.length > 5) {
                                $(".main").css("height", "auto");
                            }
                            var str = ``;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].is_read == 0) {//未读
                                    str += `<li onclick="window.location.href='#details?userId=${data[i].id}'">
				    <span></span>
					<p class="first_p">${data[i].title}</p>
					<p class="second_p">${data[i].create_time}</p>
					<img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt="">				
			</li>
						`

                                } else {
                                    str += `<li class="hui" onclick="window.location.href='#details?userId=${data[i].id}'">					
				    <span></span>
					<p class="first_p">${data[i].title}</p>
					<p class="second_p">${data[i].create_time}</p>
					<img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt="">				
			</li>
						`
                                }

                            }

                            $(".list_new").prepend(str)
                            //下拉刷新
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
                            $(".list_new").on('touchstart', function (e) {
                                startx = e.originalEvent.changedTouches[0].pageX;
                                starty = e.originalEvent.changedTouches[0].pageY;
                            });
                            //手指离开屏幕
                            $(".list_new").on("touchend", function (e) {
                                var endx, endy;
                                endx = e.originalEvent.changedTouches[0].pageX;
                                endy = e.originalEvent.changedTouches[0].pageY;
                                var direction = getDirection(startx, starty, endx, endy);
                                switch (direction) {
                                    case 0:
                                        break;
                                    case 1:
                                        var otp = $(window).scrollTop();
                                        var tops = $(".list_new").outerHeight() - $(window).height();

                                        if (otp >= tops + $(".head").outerHeight() * 1 - 8 * 1) {
                                            $(".donghua").show()
                                            $(".tishi").html("上拉加载");
                                            setTimeout(function () {
                                                $(".tishi").html("加载中...");
                                            }, 500)
                                            num++;
                                            if (num <= Math.ceil(rs.result.totalNums / 20)) {
                                                setTimeout(function () {
                                                    $(window).scrollTop(0);
                                                    getSwiperDatat(num);
                                                    $(".list_new").unbind('touchstart');
                                                }, 1500)
                                            } else {
                                                $(".tishi").html("无数据");
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


                        }

                    }


                })

            }


        }

        return {
            render: render
        }
    })
