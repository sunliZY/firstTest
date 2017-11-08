define(["jquery", "./publicComponent.js?time="+new Date(), "./headers.js?time="+new Date(), "./mima", "public", "text!../str/zhucezhang.html?time="+new Date(), "css!../css/zhucezhang.css?time="+new Date()],
    function ($, Component, headers, mima, mc, html) {
        function render() {
            $(".main").html(html);
            headers.render("信用金库");
            mima.render(".dengbtn", ".zhanghao");
            $(".back img").hide();
            if(ISiosAnH5()){
                if(ISiosAnH5().PhoneType=="H5"){
                    $(".back img").show();
                }
            }
            $(".footers").hide();
            $(".dengbtn").on("click", function () {
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
                getSwiperData();
                function getSwiperData() {
                    var r = ["registered", {username: $(".zhanghao").val()}];
                    var json = api.JsonpArr(r);
                    api.call(json, api_url).done(function (rs) {
                        sessionStorage.setItem("cunchuzhang", $(".zhanghao").val());
                        localStorage.setItem("phone", $(".zhanghao").val());
                        var ISiosAnH5s=ISiosAnH5();
                        if (rs.result.code == 1) {
                            if(ISiosAnH5s){
                                if(ISiosAnH5().PhoneType=="H5"){
                                    window.location.href = "#denglumi?PhoneType=H5&listid="+ISiosAnH5s.listid;
                                }
                            }else{
                                //已经注册  登录
                                window.location.href = "#denglumi";
                            }

                        } else {
                            if(ISiosAnH5s){
                                if(ISiosAnH5().PhoneType=="H5"){
                                    window.location.href = "#zhucemi?PhoneType=H5&listid="+ISiosAnH5s.listid;
                                }
                            }else{
                                //需要注册
                                window.location.href = "#zhucemi";
                            }

                        }
                    });
                }
            })
        }

        function ISiosAnH5(){
            if(window.location.href.split("?")[1]!=undefined){
                var Url=window.location.href.split("?")[1].split("&");
                var lacationObj={};
                for(var i = 0; i <Url.length;i++ ){
                    var ks=Url[i].split("=");
                    lacationObj[ks[0]]=ks[1]
                }
                return lacationObj;
            }else{
                return false;

            }

        }

        return {
            render: render
        }
    })
