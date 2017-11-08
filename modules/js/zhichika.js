define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"text!../str/zhichika.html?time="+new Date(),"css!../css/zhichika.css?time="+new Date()]
    ,function($, Component,headers,html){
    function render(){
        $(".main").html(html);
        headers.render("支持银行卡");
        $(".button").on("click",function(){
          window.history.back();
        })
    }
    return {
        render : render
    }
})
