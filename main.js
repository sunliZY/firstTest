require.config({
    paths: {
        "jquery": "https://imagecdn.xinyongjinku.com/wechat/lib/jquery-2.1.1.min",
        "underscore": "https://imagecdn.xinyongjinku.com/wechat/lib/underscore",
        "backbone": "https://imagecdn.xinyongjinku.com/wechat/lib/backbone",
        "text": "https://imagecdn.xinyongjinku.com/wechat/lib/text",
        "css": "https://imagecdn.xinyongjinku.com/wechat/lib/css",
        "touch": "https://imagecdn.xinyongjinku.com/wechat/lib/touch",
        "public": "https://imagecdn.xinyongjinku.com/wechat/lib/public",
        "ajaxsub":"https://imagecdn.xinyongjinku.com/wechat/lib/ajaxsub",
        'megapix':'https://imagecdn.xinyongjinku.com/wechat/lib/megapiximage',
        "check":"modules/js/check",
        "layer":"./lib/layer",
        "swiper":"./lib/swiper-3.3.1.jquery.min",
        "jweixin":"./lib/jweixin-1.2.0",
        "md5":"./lib/md5",
        "iscroll":"./lib/iscroll"
    }
});

require(["backbone", "route"], function () {
    Backbone.history.start();
    var rule = window.location.hash;
    if ( rule.split('?')[0] != '#mineZH' &&
         rule.split('?')[0] != '#share' &&
         rule.split('?')[0] != '#zhimayin' &&
         rule.split('?')[0] != '#gengduo' &&
         rule.split('?')[0] != '#huankuanzhong' &&
         rule.split('?')[0] != '#shenhes' &&
         rule.split('?')[0] != '#jiekuanzhong' &&
         rule.split('?')[0] != '#huankuanwei'&&
         rule.split('?')[0] != '#yinhangkashezhi'&&
         rule.split('?')[0] != '#yinhangkajia'&&
         rule.split('?')[0] != '#bangzhu'&&
         rule.split('?')[0] != '#woyaohuankuan'&&
         rule.split('?')[0] != '#lijihuankuan'&&
         rule.split('?')[0] != '#huankuanjilu'&&
         rule.split('?')[0] != '#jiekuanxinxi'&&
         rule.split('?')[0] != '#shenhec'&&
         rule.split('?')[0] != '#jiekuanji'&&
         rule.split('?')[0] != '#shenhez'&&
         rule.split('?')[0] != '#xiugaimi'&&
         rule.split('?')[0] != '#zhucezhang'&&
         rule.split('?')[0] != '#zhucemi'&&
         rule.split('?')[0] != '#denglumi'&&
         rule.split('?')[0] != '#jiekuanzhu'&&
         rule.split('?')[0] != '#renzhengshiming'&&
         rule.split('?')[0] != '#renzhenggeren'&&
         rule.split('?')[0] != '#lianxirenxinxi'&&
         rule.split('?')[0] != '#gongzuoxinxi'&&
         rule.split('?')[0] != '#renzhengshouji'&&
         rule.split('?')[0] != '#jiekuanxieyi'&&
         rule.split('?')[0] != '#zhucexieyi'&&
         rule.split('?')[0] != '#yunyingshangxieyi'&&
         rule.split('?')[0] != '#zhichika'&&
         rule.split('?')[0] != '#xiugaimima'&&
         rule.split('?')[0] != '#tankuang'&&
         rule.split('?')[0] != '#women'&&
         rule.split('?')[0] != '#wechat'&&
         rule.split('?')[0] != '#inform'&&
         rule.split('?')[0] != '#details'&&
         rule.split('?')[0] != '#shareResult'&&
         rule.split('?')[0] != '#add_bank'&&
         rule.split('?')[0] != '#changeBank'&&
         rule.split('?')[0] != '#yindao' &&
         rule.split('?')[0] != '#coupon' &&
         rule.split('?')[0] != '#shenhez'){
        location.hash = "yindao";
    }
})

