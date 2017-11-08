define(["jquery", "./publicComponent.js?time="+new Date(),"./headers.js?time="+new Date(), "./tankuang",
        "text!../str/jiekuanzhong.html?time="+new Date(), "css!../css/huoe.css?time="+new Date()],
    function ($, Component,headers,tankuang, html) {
        function render() {
            $(".main").html(html);
            headers.render("借款中", "remove");
            tankuang.render()
        }

        return {
            render: render
        }
    })
