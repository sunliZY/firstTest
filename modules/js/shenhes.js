define(["jquery","./publicComponent.js?time="+new Date(),"public","./headers.js?time="+new Date(),"./tankuang",
        "text!../str/shenhes.html?time="+new Date(),"css!../css/shenhes.css?time="+new Date()],
    function($, Component,mc,headers,tankuang, html){
        function render(){
            $(".main").html(html);
            headers.render("审核失败","remove");
            // tankuang.render();
            //渲染框架
            Rcont();
           }
            function Rcont() {
                $(".recommend").html("");
                for (var i = 0; i < 3; i++) {
                    var str = `
                 <ol class="loan_recommend">
                        <li class="rec_img">
                        </li>           
                  </ol>
                `
                    $(".recommend").append(str)
                }
                //列表数据
                SuperMarket();
            }

            function SuperMarket() {
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/supermarket.php?c=account";
                var r = ["supermarketPageDisplay", {}];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    var data = rs.result.data;
                    //console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].list_hot == "1") {
                            var str = `
                           <div listid="${data[i].list_id}" class='height'>
                                <div class="list_id"></div>
                                <div class="image">
                                    <img src="${data[i].list_logo}" alt="">
                                    <div style="color:${data[i].list_color}">${data[i].list_name}</div>
                                </div>
                                <p>
                                   ${data[i].list_desc}
                                </p>
                            </div>
                            `;
                        } else {
                            var str = `
                           <div listid="${data[i].list_id}" class='height'>
         
                                <div class="image">
                                    <img src="${data[i].list_logo}" alt="">
                                    <div style="color:${data[i].list_color}">${data[i].list_name}</div>
                                </div>
                                <p>
                                   ${data[i].list_desc}
                                </p>
                            </div>
                            `;
                        }

                        if (data[i].list_type == "1") {

                            if($(".loan_recommend").eq(0).find(".rec_img>div").length<2){
                                $(".loan_recommend").eq(0).find(".rec_img").append(str);
                            }
                        }
                        else if (data[i].list_type == "2") {
                            if($(".loan_recommend").eq(1).find(".rec_img>div").length<2){
                                $(".loan_recommend").eq(1).find(".rec_img").append(str);
                            }

                        } else {
                            if($(".loan_recommend").eq(2).find(".rec_img>div").length<2){
                                $(".loan_recommend").eq(2).find(".rec_img").append(str);
                            }
                        }
                    }
                    $(".height").on("click", function () {
                        window.location.href = Component.render().use() +".xinyongjinku.com/app/movepage/listdetails.html?PhoneType=H5&listid=" + $(this).attr("listid")
                    })

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
                    $(".recommend").on('touchstart', function (e) {
                        startx = e.originalEvent.changedTouches[0].pageX;
                        starty = e.originalEvent.changedTouches[0].pageY;
                    });
                    //手指离开屏幕
                    $(".recommend").on("touchend", function (e) {
                        var endx, endy;
                        endx = e.originalEvent.changedTouches[0].pageX;
                        endy = e.originalEvent.changedTouches[0].pageY;
                        var direction = getDirection(startx, starty, endx, endy);
                        switch (direction) {
                            case 0:
                                break;
                            case 1:
                                var otp = $(window).scrollTop();
                                var tops = $(".recommend").outerHeight() - $(window).height();

                                if (otp >= tops + $(".head").outerHeight() * 1 - 8 * 1) {
                                    $(".donghua").show()
                                    $(".tishi").html("上拉加载");
                                    setTimeout(function () {
                                        $(".tishi").html("加载中...");
                                        window.location.href = Component.render().use() +".xinyongjinku.com/app/movepage/productList.html?PhoneType=H5&listType=1";
                                    }, 500);
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

                })
            }


        return {
            render : render
        }
    })
