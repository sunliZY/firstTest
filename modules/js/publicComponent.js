define(["jquery"],function($){
    function render(){
        $("input").keyup(function () {
            Input($(this));
        });
        $("input").blur(function () {
            Input($(this));
        });
        $("#YSF-BTN-HOLDER").hide();
        $("#YSF-CUSTOM-ENTRY-3").hide();

        var rule = window.location.hash;

        if ( rule.split('?')[0] == '#jiekuanzhu' ||
            rule.split('?')[0] == '#shenhes'){
            $(".main").css("background","#fff")
        }else{
            $(".main").css("background","#fafafa")
        }

        if ( rule.split('?')[0] == '#jiekuanzhu' || rule.split('?')[0] == '#jiekuanxinxi' ||
             rule.split('?')[0] == '#coupon' ){

        }else{
            localStorage.removeItem("couponId");
            localStorage.removeItem("couponMoney");
            localStorage.removeItem("couponTime");
            localStorage.removeItem("couFee");
        }

        var obj = {
            use:Url,
            check:Check,
            error:Error
        };
        return obj;
    }
    function Url(){
       return "http://test";
    }
    //授信协议点击
    function Check() {
        $(".check em").on("click",function () {
            if($(this).parent().hasClass("check")){
                $(this).parent().removeClass("check");
                $(this).css({"background":"url(https://imagecdn.xinyongjinku.com/wechat/modules/images/dan.png) no-repeat center","background-size":"cover"});
                $(this).next().find("i").css("color","")
            }else{
                $(this).parent().addClass("check");
                $(this).next().find("i").css("color","blue");
                $(this).css({"background":"url(https://imagecdn.xinyongjinku.com/wechat/modules/images/danz.png) no-repeat center","background-size":"cover"});
            }
        })
        
    }


    function Input(that){
        if (that.val() == "") {
            that.css('text-shadow', '0px 0px 0px rgba(141, 141, 141, 0.54)')
        } else {
            that.css('text-shadow', '0px 0px 0px rgba(0, 0, 0, 0.71)')
        }

    }
    //反馈错误信息
    function Error(data){
        if (data.code == "10086") {
            $(".pbox").show();
            $(".pboxx div").html(data.message);
            $(".pclose").on("click", function () {
                $(".pbox").hide();
                window.location.href = '#zhucezhang'
            })
        }else if(data.message=="用户未登录"){
            window.location.href="#zhucezhang"
        }else{
            layer.msg(data.message, {
                time: 2000
            });
        }
    }
    return {
        render : render
    }
})
