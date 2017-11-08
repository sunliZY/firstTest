define(["jquery","text!../str/tankuang.html?time="+new Date(),"css!../css/tankuang.css?time="+new Date()],function($, html){
    function render(){
        $(".tankuang").html(html);
        $(".remove").click(function(event){
            $(".tankuang").fadeOut(10);
            event.stopPropagation();
        });
       var rule = window.location.hash;
        if ( rule.split('?')[0] == '#jiekuanzhong' ) {
            $(".Advertisement").css({
                "background": "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/jie@v1.1.4.png') center",
                "background-size": "cover"
            })
            $(".Advertisement").show()
            $(".boxs").hide()
            $("#Advertisement").on("click", function () {
                _hmt.push(['_trackEvent', 'guanggao', 'jiekuanzhong', 'haha']);
                window.location.href = "https://jie.yihuangjin.com/wechat/#qudao?terminal=6&source_id=2"
            })
        }
        if ( rule.split('?')[0] == '#huankuanzhong' ){
            $(".Advertisement").css({
                "background": "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/huan@v1.1.4.png') center",
                "background-size": "cover"
            })
            $(".boxs").hide()
           $(".Advertisement").show()
            $("#Advertisement").on("click",function(){
                _hmt.push(['_trackEvent', 'guanggao', 'huankuanzhong', 'haha']);
                window.location.href="https://jie.yihuangjin.com/wechat/#qudao?terminal=7&source_id=2"
            })
        }
        if ( rule.split('?')[0] == '#shenhes' ){
            $(".Advertisement").css({
                "background": "url('https://imagecdn.xinyongjinku.com/wechat/modules/images/shibai@v1.1.4.png') center",
                "background-size": "cover"
            })
            $(".boxs").hide()
           $(".Advertisement").show()
            $("#Advertisement").on("click",function(){
                _hmt.push(['_trackEvent', 'guanggao', 'shnehes', 'haha']);
                window.location.href="https://jie.yihuangjin.com/wechat/#qudao?terminal=5&source_id=2"
            })
        }
        $(".boxs").click(function(){
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                window.location.href ="https://itunes.apple.com/us/app/xin-yong-jin-ku/id1241617822?l=zh&ls=1&mt=8"
            } else if (/(Android)/i.test(navigator.userAgent)) {
                window.location.href ="http://app.qq.com/#id=detail&appid=1106223920";
            } else {
                window.location.href ="http://app.qq.com/#id=detail&appid=1106223920";
            }
        })
    }
    return {
        render : render
    }
})
