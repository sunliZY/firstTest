define ( [ "jquery" , "text!../str/header.html?time="+new Date() ] , function ( $ , html ) {
  function render ( headt , remove ) {
    $ ( ".head" ).html ( html );
    if ( headt ) {
      $ ( ".headt" ).html ( headt )
    }
    if ( remove ) {
      if ( remove == "remove" ) {
        $ ( ".back" ).html ( "" )
        $ ( ".back" ).removeClass ( "back" )
      }

    }
      $("input").keyup(function(){
          if($(this).val()==""){
              $(this).css('text-shadow', '0px 0px 0px rgba(141, 141, 141, 0.54)')
          }else{
              $(this).css('text-shadow', '0px 0px 0px rgba(0, 0, 0, 0.71)')
          }
      });
    $ ( ".back" ).on ( "click" , function () {
      if(window.location.href.split("system")=="1"){
          $ ( ".main" ).css ( "height" , "100%" )
          window.location.href = "#mineZH"
      }else{
          if ( $ ( ".renzhengshouji" ).length == 1 || $ ( ".renzhengzhima" ).length == 1 ) {
              window.location.href = "#jiekuanzhu"
          } else if($ ( ".jiekuanxinxi" ).length == 1){
              $ ( ".main" ).css ( "height" , "100%" );
              localStorage.removeItem("couponId");
              localStorage.removeItem("couponMoney");
              localStorage.removeItem("couponTime");
              localStorage.removeItem("couFee");
              window.history.back ();
          }else{
              $ ( ".main" ).css ( "height" , "100%" );
              window.history.back ();
          }
      }

    })
  }

  return {
    render : render
  }
})

