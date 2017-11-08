define(["jquery","layer", "css!../css/layer.css"],function($,layer){
    function render(even,eve){
        //点击键回车时 触发事件
        $(document).keydown(function (event) {
            if(event.keyCode==13){
                $(even).click()
            }
        });
        //进入页面时 获取焦点
        $(eve).focus();

 		//密码的显示与隐藏
        $(".jianf img").on("click", function () {
            if($(this).hasClass("ss")){
                $(this).removeClass("ss")
                $(this).attr("src","https://imagecdn.xinyongjinku.com/wechat/modules/images/h.png")
                $(".pass").val($(".text").val())
                $(".pass").show()
                $(".text").hide()
            }else{
                $(this).addClass("ss")
                $(this).attr("src","https://imagecdn.xinyongjinku.com/wechat/modules/images/k.png")
                $(".text").val($(".pass").val())
                $(".text").show()
                $(".pass").hide()

            }
        })


        $(".pass").keyup(function(){
            $(".text").val($(this).val());
            vals($(this))
        })
        
        $(".text").keyup(function(){
            $(".pass").val($(this).val());
            vals($(this))
        })


        function vals(el){
            if(el.val()==""){
                return
            }
            if(el.val().length>=8  && el.val().length<=16){
                $(".btjsd").addClass("btjsds")
                $(".btjsd").attr('disabled',false)
            }else{
                $(".btjsd").removeClass("btjsds");
                $(".btjsd").attr('disabled','disabled')
            }
        }

        $(".zhanghao").keyup(function(){
            if($(this).val().length==11){
                $(".dengbtn").addClass("dengbtns")
                $(".dengbtn").attr('disabled',false)
            }else {
                $(".dengbtn").removeClass("dengbtns")
                $(".dengbtn").attr('disabled',"disabled")
            }
        })

        $(".zhanghao").blur(function(){
            if($(this).val()==""){
                return
            }
            var A = $(this).val()
            var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (!reg.test(A)) {
                layer.msg("请输入正确手机号码", {time:2000});
                return
            }
        })


    }
    return {
        render : render
    }
})
