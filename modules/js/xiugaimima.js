define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),'public',"layer",
        "text!../str/xiugaimima.html?time="+new Date(),"css!../css/xiugaimima.css?time="+new Date(), "css!../css/layer.css"],
  function($,Component,headers,mc,layer, html){
    function render(){
        $(".main").html(html);
        headers.render("设置");
        $(".tuichu").on("click", function () {
            $(".donghua").show();
            var api_url = Component.render().use()+".xinyongjinku.com/passport/user.php?c=account";

            getSwiperData()
            function getSwiperData() {
                var r = ["signout"];
                var json = api.JsonpArr(r);

                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        sessionStorage.clear();
                        localStorage.clear();
                        window.location.href = "#jiekuanzhu";
                        $(".donghua").hide();

                    }
                });
            }
        })
    }
    return {
        render : render
    }
})
