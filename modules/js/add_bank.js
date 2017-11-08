define(["jquery","text!../str/add_bank.html?time="+new Date(),"css!../css/xieyi.css?time="+new Date()],function($,html) {
    function render() {
        $(".main").html(html);
    }
    return {
        render : render
    }
})
