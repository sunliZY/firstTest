define(["backbone","require"],function(){
    var Router = Backbone.Router.extend({
        routes : {
            "yindao" : "yindao",
            "gengduo" : "gengduo",
            "huankuanwei" : "huankuanwei",
            "yinhangkashezhi":"yinhangkashezhi",
            "yinhangkajia":"yinhangkajia",
            "bangzhu":"bangzhu",
            "woyaohuankuan":"woyaohuankuan",
            "lijihuankuan":"lijihuankuan",
            "huankuanjilu":"huankuanjilu",
            "jiekuanxinxi":"jiekuanxinxi",
            "shenhes":"shenhes",
            "shenhec":"shenhec",
            "jiekuanji":"jiekuanji",
            "shenhez":"shenhez",
            "xiugaimi":"xiugaimi",
            "huoe":"huoe",
            "zhucezhang":"zhucezhang",
            "zhucemi":"zhucemi",
            "denglumi":"denglumi",
            "jiekuanzhu":"jiekuanzhu",
            "renzhengshiming":"renzhengshiming",
            "renzhenggeren":"renzhenggeren",
            "lianxirenxinxi":"lianxirenxinxi",
            "gongzuoxinxi":"gongzuoxinxi",
            "renzhengzhima":"renzhengzhima",
            "renzhengshouji":"renzhengshouji",
            "jiekuanxieyi":"jiekuanxieyi",
            "zhucexieyi":"zhucexieyi",
            "yunyingshangxieyi":"yunyingshangxieyi",
            "zhichika":"zhichika",
            "xiugaimima":"xiugaimima",
            "tankuang":"tankuang",
            "zhimayin":"zhimayin",
            "jiekuanzhong":"jiekuanzhong",
            "huankuanzhong":"huankuanzhong",
            "mineZH":"mineZH",
            "women":"women",
            "wechat":"wechat",
            "share":"share",
            "inform":"inform",
            "details":"details",
            "shareResult":"shareResult",
            "addBank":"add_bank",
            "changeBank":"changeBank",
            "coupon":"coupon"
        
        },

        yindao : function(){
            require(["modules/js/yindao.js?time="+new Date()],function(yindao){
                yindao.render();
            })
        }, tankuang : function(){
            require(["modules/js/tankuang.js?time="+new Date()],function(tankuang){
                tankuang.render();
            })
        },  zhimayin : function(){
            require(["modules/js/zhimayin.js?time="+new Date()],function(zhimayin){
                zhimayin.render();
            })
        }, jiekuanxinxi : function(){
            require(["modules/js/jiekuanxinxi.js?time="+new Date()],function(jiekuanxinxi){
                jiekuanxinxi.render();
            })
        },shenhec : function(){
            require(["modules/js/shenhec.js?time="+new Date()],function(shenhec){
                shenhec.render();
            })
        },shenhez : function(){
            require(["modules/js/shenhez.js?time="+new Date()],function(shenhez){
                shenhez.render();
            })
        },jiekuanji : function(){
            require(["modules/js/jiekuanji.js?time="+new Date()],function(huan){
                huan.render();
            })
        },huoe : function(){
            require(["modules/js/huoe.js?time="+new Date()],function(huoe){
                huoe.render();
            })
        },zhichika : function(){
            require(["modules/js/zhichika.js?time="+new Date()],function(zhichika){
                zhichika.render();
            })
        },shenhes : function(){
            require(["modules/js/shenhes.js?time="+new Date()],function(shenhes){
                shenhes.render();
            })
        },jiekuanzhong : function(){
            require(["modules/js/jiekuanzhong.js?time="+new Date()],function(jiekuanzhong){
                jiekuanzhong.render();
            })
        },huankuanzhong : function(){
            require(["modules/js/huankuanzhong.js?time="+new Date()],function(huankuanzhong){
                huankuanzhong.render();
            })
        },zhucezhang : function(){
            require(["modules/js/zhucezhang.js?time="+new Date()],function(zhucezhang){
                zhucezhang.render();
            })
        },denglumi : function(){
            require(["modules/js/denglumi.js?time="+new Date()],function(denglumi){
                denglumi.render();
            })
        },zhucemi : function(){
            require(["modules/js/zhucemi.js?time="+new Date()],function(zhucemi){
                zhucemi.render();
            })
        },xiugaimi : function(){
            require(["modules/js/xiugaimi.js?time="+new Date()],function(xiugaimi){
                xiugaimi.render();
            })
        },
        huankuanwei : function(){
            require(["modules/js/huankuanwei.js?time="+new Date()],function(huankuanwei){
                huankuanwei.render();
            })
        },jiekuanzhu : function(){
            require(["modules/js/jiekuanzhu.js?time="+new Date()],function(jiekuanzhu){
                jiekuanzhu.render();
            })
        },renzhengshiming : function(){
            require(["modules/js/renzhengshimings.js?time="+new Date()],function(renzhengshiming){
                renzhengshiming.render();
            })
        },renzhenggeren : function(){
            require(["modules/js/renzhenggeren.js?time="+new Date()],function(renzhenggeren){
                renzhenggeren.render();
            })
        },renzhengzhima : function(){
            require(["modules/js/renzhengzhima.js?time="+new Date()],function(renzhengzhima){
                renzhengzhima.render();
            })
        },renzhengshouji : function(){
            require(["modules/js/renzhengshouji.js?time="+new Date()],function(renzhengshouji){
                renzhengshouji.render();
            })
        },
        bangzhu : function(){
            require(["modules/js/bangzhu.js?time="+new Date()],function(bangzhu){
                bangzhu.render();
            })
        },
        lianxirenxinxi : function(){
            require(["modules/js/lianxirenxinxi.js?time="+new Date()],function(lianxirenxinxi){
                lianxirenxinxi.render();
            })
        },
        gongzuoxinxi : function(){
            require(["modules/js/gongzuoxinxi.js?time="+new Date()],function(gongzuoxinxi){
                gongzuoxinxi.render();
            })
        },  yinhangkajia : function(){
            require(["modules/js/yinhangkajia.js?time="+new Date()],function(yinhangkajia){
                yinhangkajia.render();
            })
        },
        yinhangkashezhi : function(){
            require(["modules/js/yinhangkashezhi.js?time="+new Date()],function(yinhangkashezhi){
                yinhangkashezhi.render();
            })
        },
        woyaohuankuan : function(){
			 require(["modules/js/woyaohuankuan.js?time="+new Date()],function(woyaohuankuan){
			                woyaohuankuan.render();
			            })
        },
        lijihuankuan : function(){
			 require(["modules/js/lijihuankuan.js?time="+new Date()],function(lijihuankuan){
			                lijihuankuan.render();
			            })
        },huankuanjilu : function(){
			 require(["modules/js/huankuanjilu.js?time="+new Date()],function(huankuanjilu){
			                huankuanjilu.render();
			            })
        },jiekuanxieyi : function(){
			 require(["modules/js/jiekuanxieyi.js?time="+new Date()],function(jiekuanxieyi){
			                jiekuanxieyi.render();
			            })
        },zhucexieyi : function(){
			 require(["modules/js/zhucexieyi.js?time="+new Date()],function(zhucexieyi){
			                zhucexieyi.render();
			            })
        },
        yunyingshangxieyi :function(){
            require(["modules/js/yunyingshangxieyi.js?time="+new Date()],function(yunyingshangxieyi){
                yunyingshangxieyi.render();
            })
        },
        xiugaimima:function(){
            require(["modules/js/xiugaimima.js?time="+new Date()],function(xiugaimima){
                xiugaimima.render();
            })
        },
        gengduo : function(){
            require(["modules/js/mine.js?time="+new Date()],function(mine){
                mine.render();
            })
        },
        mineZH : function(){
            require(["modules/js/mineZH.js?time="+new Date()],function(mineZH){
                mineZH.render();
            })
        },
        women : function(){
            require(["modules/js/women.js?time="+new Date()],function(women){
                women.render();
            })
        },
        wechat : function(){
            require(["modules/js/wechat.js?time="+new Date()],function(wechat){
                wechat.render();
            })
        },
        share : function(){
            require(["modules/js/share.js?time="+new Date()],function(share){
                share.render();
            })
        },
        inform : function(){
            require(["modules/js/inform.js?time="+new Date()],function(inform){
                inform.render();
            })
        },
        details:function(){
            require(["modules/js/details.js?time="+new Date()],function(details){
                details.render();
            })
        },
        shareResult:function(){
            require(["modules/js/shareResult.js?time="+new Date()],function(shareResult){
                shareResult.render();
            })
        },
        add_bank:function(){
            require(["modules/js/add_bank.js?time="+new Date()],function(add_bank){
                add_bank.render();
            })
        },
        changeBank:function(){
            require(["modules/js/changeBank.js?time="+new Date()],function(changeBank){
                changeBank.render();
            })
        },
        coupon:function(){
            require(["modules/js/coupon.js?time="+new Date()],function(coupon){
                coupon.render();
            })
        }
        
        
    })
    return new Router();
})
