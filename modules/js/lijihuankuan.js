define(["jquery", "./publicComponent.js?time="+new Date(), "./headers.js?time="+new Date(), "public", "layer", "md5",
        "text!../str/lijihuankuan.html?time=" + new Date(), "css!../css/lijihuankuan.css?time=" + new Date(), "css!../css/layer.css"],
    function ($, Component, header, mc, layer, md5, html) {
        function render() {
            $(".main").html(html);
            $(".donghua").show();
            header.render("我要还款", "remove");
            Rendering();
        }

        //渲染页面信息
        function Rendering() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            var r = [
                "repaymentDetails",
                {
                    "borrow_id": window.location.href.split("=")[1]
                }
            ]
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                if (rs.error) {
                    layer.msg(rs.error.message, {time: 2000});
                    $(".donghua").hide()
                } else {
                    var data = rs.result.data;

                    if (data.is_overdue == 0) {
                            var str = `

                    <div class="dlsts">
                        <div>
                            <p>待还金额(元)</p>
                            <span>${data.amount}</span>  
                        </div>
                        <div>
                            <p>剩余还款期限（天）</p>
                            <span>${data.daysremaining}</span>
                        </div>                       
                       <p class="coupon_ljh">
                            <img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/mian@v1.1.8.png" alt="">
                            <span>${data.coupon_name}</span>
                        </p>                        

                    </div>
                    <ul class="ulss">
                        <li><span>到期还款时间</span><span></span><span>${data.plan_repay_time}</span></li>
                        <li><span>借款编号</span> <span></span><span>${data.order_id}</span></li>
                        
                         <li class="coupon_ljh_2">
                            <span><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/mian@v1.1.8.png" alt=""></span>
                            <span>优惠券</span>
                            <span>-${data.real_reduce_amount}元</span>                  
                        </li>
                        <li>
                            <span>还款账号</span>
                            <span></span>
                            <span>
                                <strong class="tiaoba">请选择银行 </strong>
                                <i><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></i>
                            </span>
                        </li>
                    </ul>
                    `
                     } else if (data.is_overdue == 1) {
                        var str = `
                    <div class="dlsts">
                        <div>
                            <p>待还金额(元)</p>
                            <span>${data.amount}</span>
                        </div>
                        <div>
                            <p class="tip_color">逾期天数（天）</p>
                            <span>${data.late_day}</span>
                        </div>
                         <p class="coupon_ljh">
                            <img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/yinhangkashezhi_icon@v1.1.0.png" alt="">
                            <span>${data.coupon_name}</span>
                        </p>    
                    </div>
                    <ul class="ulss">
                        <li class="liss"><span>逾期费用</span><span></span><span>${data.late_fee}</span></li>
                        <li><span>到期还款时间</span><span></span><span>${data.plan_repay_time}</span></li>
                        <li><span>借款编号</span> <span></span><span>${data.order_id}</span></li>
                          <li class="coupon_ljh_2">
                            <span><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/mian@v1.1.8.png" alt=""></span>
                            <span>优惠券</span>
                            <span>-${data.real_reduce_amount}元</span>                  
                        </li>
                        <li>
                            <span>还款账号</span>
                            <span></span>
                            <span>
                                <strong class="tiaoba">请选择银行 </strong>
                                <i><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/youji.png" alt=""></i>
                            </span>
                        </li>
                    </ul>
                    `
                    } else {
                        var str = ""
                    }
                    $(".conts").html(str);
                    if(data.real_reduce_amount == ""){
                        $(".coupon_ljh").hide();
                        $(".coupon_ljh_2").hide();
                    }
                    //缓存借款金额
                    sessionStorage.setItem('amount', data.amount);
                    //缓存订单编号
                    sessionStorage.setItem('orderid', data.order_id);
                    //获取还款金额
                    $(".con .divs h2 strong").html(data.amount);
                    BankList();
                }
            })
        }

        //渲染银行卡信息
        function BankList() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/bank.php?c=account";
            var r = ["bankCradList"];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    $(".tiaoba").html(rs.result.data[0].bank_name);
                    //换卡弹框渲染
                    $(".qiehuanka .list li").eq(1).find("span").eq(1).html(rs.result.data[0].bank_name);
                    //获取手机号码
                    $(".con .divs h3 strong").html(rs.result.data[0].phone.substr(rs.result.data[0].phone.length - 4));
                    //缓存银行卡号
                    sessionStorage.setItem('bankcard', rs.result.data[0].bank_card);
                    //缓存姓名
                    sessionStorage.setItem('username', rs.result.data[0].owner);
                    //换卡功能
                    $(".tiaoba").parent().parent().on("click", function () {
                        $(".qiehuanka").show(0, function () {
                            $(".qiehuanka .qiehuan").slideDown(300)
                        });
                        $(".qiehuanka .tittle .remo").on("click", function () {
                            Hide()
                        })
                        $(".qiehuanka .list li").eq(0).on("click", function () {
                            Hide();
                            window.location.href = '#changeBank?id=' + window.location.href.split("=")[1]
                        })
                        $(".qiehuanka .list li").eq(1).on("click", function () {
                            Hide()
                        })

                        function Hide() {
                            $(".qiehuanka .qiehuan").slideUp(300, function () {
                                $(".qiehuanka").hide()
                            })
                        }
                    });
                    methods();
                }
            })
        }

        //预还款验证码
        function methods() {
            $(".lijihuan").on("click", function () {
                $(".donghua").show();
                $(".tankuang").hide();
                orderid();
            })
            $(".daoji").on("click", function () {
                if ($(".daoji").html() == "重新发送" || $(".daoji").html() == "获取验证码") {
                    $(".donghua").show();
                    $(".tankuang").hide();
                    orderid();
                }
            })
        }

        function orderid() {
            var num = 60;
            time = setInterval(function () {
                num--
                $(".daoji").html(num + "s")
                $(".daoji").css("color", "#ccc")
                if (num == 0) {
                    clearInterval(time);
                    $(".daoji").html("重新发送")
                    $(".daoji").css("color", "#666")
                }
            }, 1000);
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            var r = [
                "prepaymentSendsms",
                {
                    "amount": sessionStorage.getItem("amount"), //还款金额
                    "orderid": sessionStorage.getItem("orderid"), //订单编号
                    "bankcard": sessionStorage.getItem('bankcard'), //银行卡号
                    "bankcardowner": sessionStorage.getItem('username')//银行卡所属者姓名
                }
            ];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    $(".tankuang").css("display", "block")
                    sessionStorage.setItem("orderid", rs.result.data.orderid);
                    $(".quxiao").on("click", function () {
                        $(".tankuang").css("display", "none")
                    });

                    $(".queding").on("click", function () {
                        repayment();
                    })

                }
            })
        }

        //执行还款
        function repayment() {
            $(".donghua").show()
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            var r = [
                "repaymentOfperfirmance",
                {
                    "validatecode": $(".yans").val(), //预还款验证码
                    "orderid": sessionStorage.getItem("orderid") //订单编号
                }
            ];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    $(".tankuang").css("display", "none");
                    window.location.href = "#huankuanzhong";
                }
            })
        }

        return {
            render: render
        }
    })
