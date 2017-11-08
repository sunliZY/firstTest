define(["jquery", "swiper", "./publicComponent.js?time="+new Date(), "public", "./headers.js?time="+new Date(), "text!../str/mine.html?time="+new Date(), "css!../css/gengduo.css?time="+new Date(), "css!../css/swiper-3.3.1.min.css"],
    function ($, swiper, Component, mc, headers, html) {
        function render() {
            $(".main").html(html);
            headers.render("金库", "remove");
            $(".donghua").show();
            //推荐列表
            Recommend();
            //渲染框架
            Rcont();

            methods();
        }

        function Rcont() {
            $(".loanmodules").html("");
            for (var i = 0; i < 3; i++) {
                var str = `
                 <ol class="loan_modules">
                        <li class="tongguo">
                            <span><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/height_pass@v1.1.6.png" alt=""></span>
                            <span></span>
                            <span> <img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></span>
                        </li>
                        <li class="dai_img">
                        </li>
            
                    </ol>
                `
                $(".loanmodules").append(str)
            }

            $(".loanmodules .loan_modules").eq(0).find(".tongguo span").eq(0).find("img").attr("src","https://imagecdn.xinyongjinku.com/wechat/modules/images/height_pass@v1.1.6.png");
            $(".loanmodules .loan_modules").eq(1).find(".tongguo span").eq(0).find("img").attr("src","https://imagecdn.xinyongjinku.com/wechat/modules/images/ten_loan@v1.1.6.png");
            $(".loanmodules .loan_modules").eq(2).find(".tongguo span").eq(0).find("img").attr("src","https://imagecdn.xinyongjinku.com/wechat/modules/images/big_loan@v1.1.6.png");

            //列表数据
            SuperMarket();
        }

        function Recommend() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/supermarket.php?c=account";
            var r = ["recommend", {}];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                var data = rs.result.data;
                for (var j = 0; j < data.length; j++) {
                    var str = `                                        
                            <div listID="${data[j].list_id}" class="swiper-slide">
                                <span><img src="${data[j].picture}" alt=""></span>                             
                            </div>
                                                                                     
                      `
                    $(".swiper-wrapper").append(str);
                }
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    //滑动速度，即slider自动滑动开始到结束的时间（单位ms）
                    speed: 600,
                    slidesPerView: 2.5,
                    spaceBetween: 10
                });
                $(".swiper-slide").on("click", function () {
                    var listId = $(this).attr('listID');
                    var api_url = Component.render().use() + ".xinyongjinku.com/passport/supermarket.php?c=account";
                    var rr = ["recommendClick", {
                        "id": listId
                    }];
                    var json = api.JsonpArr(rr);
                    api.call(json, api_url).done(function (rs) {
                        if (rs.error) {
                            Component.render().error(rs.error);
                        } else {
                            window.location.href = Component.render().use()+".xinyongjinku.com/app/movepage/listdetails.html?PhoneType=H5&listid=" + listId
                        }
                    })
                })
            })
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
                        $(".loan_modules").eq(0).find("li").eq(0).find("span").eq(1).html("高通过率");

                        $(".loan_modules").eq(0).find(".dai_img").append(str);
                    }
                    else if (data[i].list_type == "2") {
                        $(".loan_modules").eq(1).find("li").eq(0).find("span").eq(1).html("十分钟之内放款");
                        $(".loan_modules").eq(1).find(".dai_img").append(str);
                    } else {
                        $(".loan_modules").eq(2).find("li").eq(0).find("span").eq(1).html("大额贷款");
                        $(".loan_modules").eq(2).find(".dai_img").append(str);
                    }
                }
                $(".height").on("click", function () {
                    window.location.href = Component.render().use()+".xinyongjinku.com/app/movepage/listdetails.html?PhoneType=H5&listid=" + $(this).attr("listid")
                })
            })
        }

        function methods() {
            $(".tongguo").on("click", function () {
                var list = $(this).find("span").eq(1).html();
                if (list == "高通过率") {
                    list = 1;
                }
                else if (list == "十分钟之内放款") {
                    list = 2;
                }
                else if (list == "大额贷款") {
                    list = 3;
                }
                window.location.href = Component.render().use()+".xinyongjinku.com/app/movepage/productList.html?PhoneType=H5&listType=" + list
            });
        }

        return {
            render: render
        }
    })
