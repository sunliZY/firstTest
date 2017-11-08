define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "text!../str/huankuanwei.html?time="+new Date(), "css!../css/huoe.css?time="+new Date()],
    function ($, Component,headers,html) {
        function render() {
            $(".main").html(html);
            headers.render("还款记录", "remove");
        }

        return {
            render: render
        }
    })
