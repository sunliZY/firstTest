define(["jquery", "./publicComponent.js?time="+new Date(), "public", "layer", "../../lib/ajaxsub",
        "text!../str/renzhengshiming.html?time="+new Date(), "css!../css/renzhengshiming.css?time="+new Date(), "css!../css/layer.css"
    ],
    function ($, Component, mc, layer, sub, html) {
        function render() {
            $(".main").html(html);
            $(".donghua").show();
            var api_url = Component.render().use() + ".xinyongjinku.com/passport/files.php?c=index";
            GetSetUrl(api_url);
            Rendering();
        }
        function Rendering() {
            $("input").keyup(function () {
                if ($(this).val() == "") {
                    $(this).css('text-shadow', '0px 0px 0px rgba(141, 141, 141, 0.54)')
                } else {
                    $(this).css('text-shadow', '0px 0px 0px rgba(0, 0, 0, 0.71)')
                }
            });
            $(".back").on("click", function () {
                if (window.location.href.split("system") == "1") {
                    $(".main").css("height", "100%")
                    window.location.href = "#mineZH"
                } else {
                    window.location.href = "#jiekuanzhu"
                }
            });
        }

        function methods(cunchuAjax) {
            $(".xingming").blur(function () {
                var A = $(this).val().replace(/(^\s+)|(\s+$)/g, "");
                var reg = /^[\u4e00-\u9fa5]{2,4}$/
                if (A == "") {
                } else if (!reg.test(A)) {
                    layer.msg("ֻ姓名格式不正确", {
                        time: 2000
                    });
                    $(this).val("");
                    return;
                }
            });
            $(".shenfens").blur(function () {
                var A = $(this).val();
                var reg1 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
                if (A == "") {
                } else if (!reg1.test(A)) {
                    layer.msg("ֻ身份证号码格式不正确", {
                        time: 2000
                    });
                    $(this).val("");
                    return;
                }
            });

            $(".gogeren").on("click", function () {
                if ($(".xingming").val() == "" || $(".shenfens").val() == "") {
                    layer.msg("完善数据", {
                        time: 2000
                    });
                    return
                }
                if (!cunchuAjax.renzheng || !cunchuAjax.renfan || !cunchuAjax.renlian) {
                    layer.msg("完善数据", {
                        time: 2000
                    });
                    return;
                }
                $(".mBox").show();
                $(".xbox ul li .name").html($(".xingming").val())
                $(".xbox ul li .idcard").html($(".shenfens").val())

            })
            $(".go_change").on("click", function () {
                $(".mBox").hide();
            })
            $(".go_next").on("click", function () {

                $(".donghua").show()
                var api_url = Component.render().use() + ".xinyongjinku.com/passport/user.php?c=account";
                getSwiperDatas()

                function getSwiperDatas() {
                    var str = JSON.parse(cunchuAjax.renzheng).filename.url.split("file")[1].substring(1)
                    var str1 = JSON.parse(cunchuAjax.renfan).filename.url.split("file")[1].substring(1)
                    var str2 = JSON.parse(cunchuAjax.renlian).filename.url.split("file")[1].substring(1)
                    var r = ["creditStepOne",
                        //                            "isIdentify",
                        {
                            "system": "web",
                            "id_number": $(".shenfens").val(), //身份证号
                            "user_name": $(".xingming").val(), //姓名
                            "information_step": 1, //步数 1 2 3 4
                            "id_number_image_1": str, //身份证  正面
                            "id_number_image_2": str1, //身份证  反面
                            "face_image": str2 //人脸识别 照片
                        }
                    ]
                    var json = api.JsonpArr(r);

                    api.call(json, api_url).done(function (rs) {
                        $(".donghua").hide();
                        if (rs.error) {
                            Component.render().error(rs.error);
                        } else{
                            $(".donghua").hide()
                            $(".mBox").hide();
                            $(".xbox").hide();
                            window.location.href = "#renzhenggeren"
                        }
                    })
                }
            })
        }

        function GetSetUrl(api_url) {
            var r = ["getUploadUrl",
                {
                    "style": ""
                }
            ];
            var json = api.JsonpArr(r);
            api.call(json, api_url).done(function (rs) {
                $(".donghua").hide()
                if (rs.error) {
                    if (rs.error.code == "10086") {
                        $(".pbox").show()
                        $(".pboxx div").html(rs.error.message)
                        $(".pclose").on("click", function () {
                            $(".pbox").hide()
                            window.location.href = '#zhucezhang'
                        })

                    } else if (rs.error.message == "用户未登录") {
                        window.location.href = "#zhucezhang"
                    } else {
                        layer.msg(rs.error.message, {time: 2000});
                    }
                }
                else {
                    if (!window.FileReader) {
                        layer.msg("浏览器不支持文件获取", {
                            time: 2000
                        });
                        return;
                    } else {
                        GetImgUrl(rs.result.data.msg)

                    }
                }
            })
        }

        function GetImgUrl(url) {
            var cunchuAjax = {};
            cunchuAjax.url = url;
            $(".file1").on("change", function () {
                GetImg(cunchuAjax, 'renzheng', ".file1",".right-img1");
                methods(cunchuAjax)
            });
            $(".file2").on("change", function () {
                GetImg(cunchuAjax, 'renfan', ".file2",".right-img2");
                methods(cunchuAjax);
            });
            $(".file3").on("change", function () {
                GetImg(cunchuAjax, 'renlian', ".file3",".right-img3");
                methods(cunchuAjax);
            });
        }

        function GetImg(cunchuAjax, title, ele,eles) {
            $(".donghua").show();
            var file = document.querySelector(ele).files[0];
            if (!/image\/\w+/.test(file.type)) {
                layer.msg("需要的是图片", {time: 2000});
                return;
            }
            var reader = new FileReader(), img = new Image();

            // 缩放图片需要的canvas
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            reader.readAsDataURL(file);
            reader.onload = function () {
                var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                img.src = url;
            };
            // base64地址图片加载完毕后
            img.onload = function () {
                // 图片原始尺寸
                var originWidth = this.width;
                var originHeight = this.height;
                // 最大尺寸限制
                var maxWidth = 400, maxHeight = 400;
                // 目标尺寸
                var targetWidth = originWidth, targetHeight = originHeight;
                // 图片尺寸超过400x400的限制
                if (originWidth > maxWidth || originHeight > maxHeight) {
                    if (originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);

                var base64 = canvas.toDataURL();  // 这里的“1”是指的是处理图片的清晰度（0-1）之间，当然越小图片越模糊，处理后的图片大小也就越小
                function dataURLtoBlob(dataurl) {
                    var arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], {type: mime});
                }

                var blob = dataURLtoBlob(base64)
                var fd = new FormData();
                fd.append('filename', blob, "image.png");//blob对象添加到formdata里面是要加入类型
                $.ajax({
                    type: "POST",
                    url: cunchuAjax.url,
                    data: fd,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    success: function (data) {
                        var data = JSON.parse(data);
                        $(".donghua").hide();
                        if (data.err_code == 0) {
                            if(title=="renzheng"){
                                cunchuAjax.renzheng = data.err_msg;
                            }else if(title=="renfan"){
                                cunchuAjax.renfan = data.err_msg;
                            }else if(title=="renlian"){
                                cunchuAjax.renlian = data.err_msg;
                            }
                            $(eles).css("display", "block");
                        } else {
                            layer.msg("失败了", {time: 2000});
                        }
                    }
                });
            }
        }

        return {
            render: render
        }
    })