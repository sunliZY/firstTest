define(["jquery","./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(),"public","layer","jweixin","./jquery.qrcode.js",
        "./qrcode.js", "text!../str/share.html?time="+new Date(), "css!../css/share.css?time="+new Date(), "css!../css/layer.css"],
	function($,Component,headers,mc,layer,wx,jqrcode, qrcode, html) {
		function render() {

			$(".main").html(html);
            headers.render("分享邀请");
            $ ( "#YSF-BTN-HOLDER" ).hide ();
            $ ( "#YSF-CUSTOM-ENTRY-3" ).hide ();
			var api_url = Component.render().use()+".xinyongjinku.com/passport/index.php?c=first"
			getSwiperDatauu();
			function getSwiperDatauu() {
				$(".donghua").show()
				var r = ["index", " "];
				var json = api.JsonpArr(r);
				api.call(json, api_url).done(function(rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    }  else {
						var data = rs.result.data;
                        $(".donghua").hide()
						sessionStorage.setItem("data",JSON.stringify(data))

                        var data = JSON.parse(sessionStorage.getItem("data"))
                        var api_url = Component.render().use()+".xinyongjinku.com/passport/user.php?c=account"
                        getSwiperDatauus();
                        function getSwiperDatauus(){
                            $(".donghua").show()
                            var r = ["userBaseInfo"];
                            var json = api.JsonpArr(r);
                            api.call(json,api_url).done(function(rs){
                                $(".donghua").hide();
                                if (rs.error) {
                                    Component.render().error(rs.error);
                                } else{
                                    $(".donghua").hide()
                                    var data2 = rs.result.data;

                                    var url = Component.render().use()+".xinyongjinku.com/app/share/landing.html?channe=157&username=" + data.user_name + "&phone=" + data.phone+"&userid="+data2.id+"&Route=code";

                                    $('.erweima').qrcode({
                                        text: url, //二维码代表的字符串（本页面的URL）
                                        width: 155, //二维码宽度
                                        height: 155 //二维码高度
                                    });
                                }
                            })

                        }

                        $(".yq").on("click", function() {
                            var str = Component.render().use()+".xinyongjinku.com/app/share/details.html?phone=" + data.phone+"&system=web";
                            window.location.href = str;
                        })
					}
				})

			}
		}
		return {

			render: render
		}
	})