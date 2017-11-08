define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"./tankuang","text!../str/shenhec.html?time="+new Date(),"css!../css/shenhec.css?time="+new Date()],
    function($, Component,headers,tankuang, html){
    function render(){
        $(".main").html(html);
        headers.render("审核成功","remove");
        tankuang.render()
    }
    return {
        render : render
    }
})
