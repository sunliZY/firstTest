define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "public", "layer",
        "text!../str/details.html?time="+new Date(), "css!../css/details.css?time="+new Date(), "css!../css/layer.css"],
    function ($, Component,headers,mc, layer, html) {
        function render() {
            $(".main").html(html);
            headers.render("通知详情");
            $(".main").css("height", "100%");
            var userId = window.location.href.split("?")[1].split("userId=")[1];

            var api_url = Component.render().use() + ".xinyongjinku.com/passport/index.php?c=first";
            getSwiperData();

            function getSwiperData() {
                var r = ["noticeDetail", {
                    "notice_user_id": userId
                }];
                var json = api.JsonpArr(r);

                api.call(json, api_url).done(function (rs) {
                    $(".donghua").hide();
                    if (rs.error) {
                        Component.render().error(rs.error);
                    } else {
                        var str = rs.result.data.content;
                        var c = function escape2Html(str) {
                            var arrEntities = {
                                'lt': '<',
                                'gt': '>',
                                'nbsp': ' ',
                                'amp': '&',
                                'quot': '"'
                            };
                            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, i) {
                                return arrEntities[i];
                            });
                        };

                        var data = rs.result.data;
                        $(".details h3").html(data.title);
                        $(".details .time").html(data.create_time);
                        $(".details .content").html(c(str));

                    }

                });
            }

        }

        return {
            render: render
        }
    })