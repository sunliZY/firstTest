define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public","layer","./tankuang",
        "text!../str/shenhez.html?time="+new Date(),"css!../css/shenhez.css?time="+new Date(), "css!../css/layer.css"],
    function($,Component,headers,mc, layer,tankuang, html){
    function render(){
        $(".main").html(html);
        headers.render("资料审核","remove");
        tankuang.render()
    }
    return {
        render : render
    }
})
