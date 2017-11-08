define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "public","layer",
        "text!../str/renzhengzhima.html?time="+new Date(), "css!../css/renzhengzhima.css?time="+new Date(), "css!../css/layer.css"],
    function ($,Component, headers, mc, layer,html) {
    function render() {
        $(".main").html(html);
        headers.render("认证芝麻")
        $(".back").on("click", function () {
            window.location.href="#jiekuanzhu"
        })
        Component.render().check();
        $(".kaizhima").on("click", function () {
            $(".donghua").show()
            $(".tishi").html("")
            var api_url = Component.render().use()+".xinyongjinku.com/passport/user.php?c=account";

            getSwiperDatasu()
            function getSwiperDatasu() {
                var r = ["profile"];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    }  else {
                        $.ajax({
                            url:Component.render().use()+".xinyongjinku.com/wechat/modules/phpscript/getUrl.php",

                            type:"post",
                            data:{
                                name:rs.result.data.user_name,
                                idcard:rs.result.data.id_number
                            },
                            success:function(data){
                                $(".donghua").hide()
                                window.location.href=JSON.parse(data).url
                            }
                        })
                    }
                })
            }

        })
    }

    return {
        render: render
    }
})
