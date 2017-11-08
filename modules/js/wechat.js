define(["jquery","./headers.js?time="+new Date(),"text!../str/wechat.html","css!../css/xiugaimima.css"],
  function($,headers,html){
    function render(){
        $(".main").html(html);
        headers.render("公众号")
    }
    return {
        render : render
    }
})
