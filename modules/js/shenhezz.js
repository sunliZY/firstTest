define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public","layer","./tankuang",
        "text!../str/shenhez.html?time="+new Date(),"css!../css/shenhez.css?time="+new Date(), "css!../css/layer.css"],
    function($,Component,headers,mc, layer,tankuang, html){
    function render(){
        $(".main").html(html);
        headers.render("资料审核","remove")
        tankuang.render();
        var rule = window.location.hash;
        if(rule.split('?')[1] == ""){

        }else if(rule.split("?")[1].split("&")[4].split("=")[1]=="false") {
          var api_url = Component.render().use() +".xinyongjinku.com/passport/user.php?c=account";
          getSwiperDatas()
          function getSwiperDatas() {
            var r = [
              "newGetSesameCredit",
              {
                "system":"web",
                "openId":"",
                "success":'flase'
              }
            ];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide();
                if (rs.error) {
                    Component.render().error(rs.error);
                } else{
                window.location.href="#zhimayin"
              }
            })
          }
          //window.location.href="#shenhez"
        }else if(rule.split("?")[1].split("&")[5].split("=")[1]!="true"){
           window.location.href="#shenhes"
        }else{
            var api_url = Component.render().use() +".xinyongjinku.com/passport/user.php?c=account";
            getSwiperData()
            function getSwiperData() {
                var r = [
                    "newGetSesameCredit",
                    //"getSesameCredit",
                    {
                        "system":"web",
                        "openId": rule.split("?")[1].split("&")[0].split("=")[1],
                        "success":'true'
                    }
                ];
                var json = api.JsonpArr(r);
                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else{
                      window.location.href="#shenhez"
                    }
                })
            }
        }
    }
    return {
        render : render
    }
})
