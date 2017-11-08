define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"text!../str/women.html?time="+new Date(),"css!../css/women.css?time="+new Date()],
  function($,Component,headers,html){
    function render(){
        $(".main").html(html);
        headers.render("关于信用金库");
    }
    return {
        render : render
    }
})
