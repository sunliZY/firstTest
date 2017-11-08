define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public", "layer",
        "text!../str/woyaohuankuan.html?time="+new Date(), "css!../css/woyaohuankuan.css?time="+new Date(), "css!../css/layer.css"],
    function ($, Component,headers,mc, layer, html) {
        function render() {
            $(".main").html(html);
            headers.render("我要还款");
            $(".donghua").show();
            Rendering();
        }
        
        function Rendering() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            getSwiperDatat(api_url);
        }

            function getSwiperDatat(api_url) {
                var r = ["listofBorrowings"];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".contss").html("");
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        $(".donghua").hide()
                        if (rs.result.data.totalmoney.totalmoney == 0) {
                            window.location.href = "#huankuanwei"
                        }
                        $(".tittle h1").html(rs.result.data.totalmoney.totalmoney);
                        var data = rs.result.data.userlistofborrowings;
                        //判断是否逾期
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].is_overdue == 0) {
                                str = `
                                    <div>
                                        <p>借款金额</p>
                                        <p>借款日期</p>
                                        <p>到期还款日</p>
                                    </div>
                                    <div>
                                        <p>${data[i].amount}</p>
                                        <p>${data[i].create_time}</p>
                                        <p>${data[i].plan_repay_time}</p>
                                    </div>
                                    <div>
                                        <button class="huanba">立即还款 <i>${data[i].borrow_id}</i> </button>
                                    </div>

                       `

                            } else {
                                str = `
                                    <div>
                                        <p>借款金额</p>
                                        <p>借款日期</p>
                                        <p>到期还款日</p>
                                        <p class="red">逾期天数</p>
                                    </div>
                                    <div>
                                        <p>${data[i].amount}</p>
                                        <p>${data[i].create_time}</p>
                                        <p>${data[i].plan_repay_time}</p>
                                        <p class="red">${data[i].late_day}天</p>
                                    </div>
                                    <div>
                                        <button class="huanba">立即还款 <i>${data[i].borrow_id}</i> </button>
                                    </div>

                       `

                            }
                            $(".donghua").hide()
                            $("<div class='ones'>").html(str).appendTo($(".contss"))

                            $(".ones").on("click", "button", function () {
                                window.location.href = "#lijihuankuan?id=" + $(this).find("i").html()
                            })
                        }
                    }
                })
            }


        return {
            render: render
        }
    })
