define(["jquery"],function($){
	
    function render(){
        $(".check  em").on("click",function(){
            if($(this).parent().hasClass("check")){
                $(this).parent().removeClass("check")
                $(this).css({"background":"url(https://imagecdn.xinyongjinku.com/wechat/modules/images/dan.png) no-repeat center","background-size":"cover"})
                $(this).next().find("i").css("color","")
            }else{
                $(this).parent().addClass("check")
                $(this).next().find("i").css("color","blue")
                $(this).css({"background":"url(https://imagecdn.xinyongjinku.com/wechat/modules/images/danz.png) no-repeat center","background-size":"cover"})
            }
        })
    }
    return {
        render : render
    }
})
