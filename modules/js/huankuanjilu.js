define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public", "layer",
        "text!../str/huankuanjilu.html?time="+new Date(), "css!../css/huankuanjilu.css?time="+new Date(), "css!../css/layer.css"],
    function ($, Component,headers,mc, layer, html) {
        function render() {
            $(".main").html(html);
            headers.render("借款详情");
            $(".donghua").show();
            Rendering();
        }
        function Rendering() {
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/order.php?c=index";
            getSwiperDatatt(api_url);
        }
        function getSwiperDatatt(api_url) {
            var r = [
                "particularsofBorrowing",
                {
                    "borrow_id": window.location.href.split("=")[1]       //借款Id
                }
            ];

            var json = api.JsonpArr(r);
            //console.log(json);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else {
                    var data = rs.result.data;
                    var hes = `
                              <h1>${data.amount_due}</h1>
                              <h2>${data.order_status_name}</h2>
                             `

                    var cot = `
                          
                               <ul>
                                    <li><span>借款金额</span><i>${data.amount}</i></li>
                                    <li class="Alis"><span>到账金额</span><i>${data.arrivalamount}</i></li>
                                    <li class="coupon_hjl">
                                        <span><img src="https://imagecdn.xinyongjinku.com/wechat/modules/images/mian@v1.1.8.png" alt=""></span>
                                        <span>优惠券</span>
                                        <span>-${data.real_reduce_amount}元</span>                  
                                    </li>
                                    <li><span>借款时间</span><i>${data.create_time}</i></li>
                                    <li class="should Alis"><span>应还账款</span><i>${data.amount_due}</i></li>
                                    <li class="Alis"><span>应还账款时间</span><i>${data.plan_repay_time}</i></li>
                                    <li class="red Alis"><span>实际还款时间</span><i>${data.real_repay_time}</i></li>
                                    <li class="Alis"><span>提现银行卡</span><i>${data.embodimentcard}</i></li>
                                    <li class="shouK Alis"><span>还款银行卡</span><i>${data.repayment_card}</i></li>
                                    <li class="number Alis"><span>借款编号</span><i>${data.order_id}</i></li>
                                    <li class="overdue Alis"><span>逾期天数</span><i>${data.late_day}</i></li>
                             </ul>
                                
                 
                        `
                    $(".Detailtle").html(hes);
                    $(".conts").html(cot);
                    $(".donghua").hide();


                    if ( data.order_status_name == "打款处理中"){
                        $(".red").hide();
                        $(".shouK").hide();
                    }else if ( data.order_status_name == "还款处理中"){
                        $(".number").hide();
                    }else if ( data.order_status_name == "已还款"){
                        $(".should").hide();
                        $(".number").hide();
                    }else if ( data.order_status_name == "订单取消"){
                        $(".Alis").hide();
                    }else{
                        $(".shouK").hide();
                        if(data.late_day>0){
                            $(".overdue").css("display","flex")

                        }
                    }

                    if(data.real_reduce_amount*1<=0){
                        $(".coupon_hjl").hide();
                    }


                }
            })
        }

        return {
            render: render
        }
    })
