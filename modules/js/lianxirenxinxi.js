define(["jquery","layer","text!../str/lianxirenxinxi.html?time="+new Date(),
        "css!../css/renzhenggeren.css?time="+new Date(),"css!../css/lianxirenxinxi.css?time="+new Date(),
        "css!../css/pop.css?time="+new Date(), "css!../css/layer.css"],
    function($, layer,html){
    function render(){
        $(".main").html(html);
        $(".back").on("click", function () {
            window.history.back()
        })
        $(".cont ul li").eq(0).on("click",function(){
            $(this).find("span").eq(2).addClass("dianjile")
            tanchu([
                {"text":"父母<mark style='display:none'>1</mark>"},
                {"text":"配偶<mark style='display:none'>2</mark>"},
                {"text":"兄弟姐妹<mark style='display:none'>3</mark>"},
                {"text":"朋友<mark style='display:none'>4</mark>"}
            ])
        })

        $(".cont ul li").eq(3).on("click",function(){
            $(this).find("span").eq(2).addClass("dianjile")
            tanchu( [
                {"text":"父母<mark style='display:none'>1</mark>"},
                {"text":"配偶<mark style='display:none'>2</mark>"},
                {"text":"兄弟姐妹<mark style='display:none'>3</mark>"},
                {"text":"朋友<mark style='display:none'>4</mark>"}
            ])
        })

        function tanchu(data){
            var str="";
            str+=`<div class="zhezhao">
                <div class="pop">
                    <div class="tittle">
                        <span class="remove">取消</span>
                        <span></span>
                        <span class="true">确定</span>
                    </div>
                    <ul class="popslid">
                `
            for(var i=0;i<data.length;i++){
                str+=`<li>${data[i].text}</li>`
            }
            str+=`</ul></div></div>`
            $('body').append($(str))

            function remove(){
                $(".zhezhao").remove()
                $(".dianjile").removeClass("dianjile")
            }

            $(".remove").on("click",function(){
                remove()
            })
            $(".true").on("click",function(){
                $(".dianjile").prev().html($(".ost").html())
                remove()
            })
            $(".popslid li").on("click",function(){
                $(this).addClass("ost").siblings().removeClass("ost")
            })
        }
        //验证姓名
        $(".ming").blur(function () {
            if($(this).val()!="") {
                var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
                var reg = /^[\u4e00-\u9fa5]{2,4}$/
                if (!reg.test(A)) {
                    layer.msg("ֻ姓名格式不正确", {time:2000});
                  $(this).val("")
                    return;
                }
            }else{

            }
        });
        //验证姓名
        $(".mings").blur(function () {
            if($(this).val()!=""){
                var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
                var reg = /^[\u4e00-\u9fa5]{2,4}$/
                if (!reg.test(A)) {
                    layer.msg("ֻ姓名格式不正确", {time:2000});
                  $(this).val("")
                    return;
                }
            }else{

            }

        });

        //验证手机号码
        $(".shi").blur(function () {
            if($(this).val()!="") {
                var A = $(this).val()
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (!reg.test(A)) {
                    layer.msg("请输入正确手机号码", {time:2000});
                    $(this).val("")
                }
            }else{

            }
            if($(this).val()==localStorage.getItem("phone")){
                layer.msg("与注册手机号码相同", {time:2000});
                return
            }
        });
        //验证手机号码
        $(".shis").blur(function () {
            if($(this).val()!="") {
                var A = $(this).val()
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if (!reg.test(A)) {
                    layer.msg("请输入正确手机号码", {time:2000});
                    $(this).val("") 
                   return
                }
            }else{

            }
            if($(this).val()==localStorage.getItem("phone")){
                layer.msg("与注册手机号码相同", {time:2000});
              return
               
            }
        });

        var data=JSON.parse(localStorage.getItem("lianxiren"))

        if(data){
            $(".cont ul li").eq(0).find("span").eq(1).html(data.data.relations)
           $(".cont ul li").eq(1).find("input").val(data.data.names)
            $(".cont ul li").eq(2).find("input").val(data.data.mobile)

            $(".cont ul li").eq(3).find("span").eq(1).html(data.data1.relation1s)
            $(".cont ul li").eq(4).find("input").val(data.data1.name1)
            $(".cont ul li").eq(5).find("input").val(data.data1.mobile1)
        }

        $(".goshang").on("click",function(){

            for(var i=0;i<$(".cont ul li").length;i++) {
                if ($(".cont ul li").eq(i).find("span").eq(1).html() == "" || $(".cont ul li").eq(i).find("input").val() == "") {
                    layer.msg("将信息填写完整", {time:2000});
                  return
                }
            }

            if($(".cont ul li").eq(0).find("span").eq(1).text()=="配偶2" && $(".cont ul li").eq(3).find("span").eq(1).text()=="配偶2"){
                layer.msg("配偶不可以重复", {time:2000});
               return
            }

            if($(".cont ul li").eq(2).find("input").val()==$(".cont ul li").eq(5).find("input").val()){
                layer.msg("联系方式不可以重复", {time:2000});
               return
            }

           relation=$(".cont ul li").eq(0).find("span").eq(1).find("mark").html()
           relations=$(".cont ul li").eq(0).find("span").eq(1).html()
           names=$(".cont ul li").eq(1).find("input").val()
           mobile=$(".cont ul li").eq(2).find("input").val()

          relation1=$(".cont ul li").eq(3).find("span").eq(1).find("mark").html()
          relation1s=$(".cont ul li").eq(3).find("span").eq(1).html()
            name1=$(".cont ul li").eq(4).find("input").val()
            mobile1=$(".cont ul li").eq(5).find("input").val()

            var lianxi={
                data:{
                    relation:relation,
                    relations:relations,
                    names:names,
                    mobile:mobile
                },
                data1:{
                    relation1:relation1,
                    relation1s:relation1s,
                    name1:name1,
                    mobile1:mobile1
                }
            }

            localStorage.setItem("lianxiren",JSON.stringify(lianxi))
            window.location.href="#renzhenggeren"
        })

    }
   return {
        render : render
    }
})
