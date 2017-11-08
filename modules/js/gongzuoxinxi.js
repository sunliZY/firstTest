define(["jquery","layer","text!../str/gongzuoxinxi.html"+new Date(),
        "css!../css/renzhenggeren.css?time="+new Date(),"css!../css/pop.css?time="+new Date(), "css!../css/layer.css"],
    function($, layer,html){
    function render(){
        $(".main").html(html);
        $(".back").on("click", function () {
            window.history.back()
        })
        var data=JSON.parse(localStorage.getItem("gongzuo"))
            if(data){
                $(".cont ul li").eq(0).find("span").eq(1).html(data.companyindustry),        //从事行业
               $(".cont ul li").eq(1).find("input").val(data.companytitle),           //工作岗位
               $(".cont ul li").eq(2).find("input").val(data.companyname),            //单位名称
               $(".cont ul li").eq(3).find("input").val(data.companyaddress),         //单位所在地
               $(".cont ul li").eq(4).find("input").val(data.companyphone)
             }
        $(".cont ul li").eq(0).on("click",function(){
            $(this).find("span").eq(2).addClass("dianjile")
            tanchu([
                {"text":"个体户"},
                {"text":"无业"},
                {"text":"学生"},
                {"text":"水利、环境和公共设施管理业"},
                {"text":"教育"},
                {"text":"文化、体育和娱乐业"},
                {"text":"采掘业"},
                {"text":"制造业"},
                {"text":"电力、燃气及水的生产和供应业"},
                {"text":"建筑业"},
                {"text":"交通运输、仓储和邮政业"},
                {"text":"信息传输、计算机服务和软件业"},
                {"text":"批发零售业"},
                {"text":"住宿餐饮业"},
                {"text":"金融业"},
                {"text":"房地产业"},
                {"text":"租赁和商务服务业"}
            ])
        });
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

        $(".goshang").on("click",function(){
            for(var i=1;i<$(".cont ul li").length-1;i++) {
                if ($(".cont ul li").eq(i).find("input").val() == "") {
                    layer.msg("将表单填写完整", {time:2000});
                    return
                }
            }

            var gongzuo={
                "companyindustry":$(".cont ul li").eq(0).find("span").eq(1).html(),        //从事行业
                 "companytitle":$(".cont ul li").eq(1).find("input").val(),           //工作岗位
                 "companyname":$(".cont ul li").eq(2).find("input").val(),            //单位名称
                 "companyaddress":$(".cont ul li").eq(3).find("input").val(),         //单位所在地
                 "companyphone":$(".cont ul li").eq(4).find("input").val()
            }

            localStorage.setItem("gongzuo",JSON.stringify(gongzuo))
            window.location.href="#renzhenggeren"
        })
    }
    return {
        render : render
    }
})
