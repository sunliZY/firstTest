define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"text!../str/huoe.html?time="+new Date(),"css!../css/huoe.css?time="+new Date()],
    function($,Component,headers, html){
    function render(){
        $(".main").html(html);
        headers.render("获得额度","remove");
    }
    return {
        render : render
    }
})

''



