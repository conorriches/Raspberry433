$( document ).ready(function(){

    $(".button-collapse").sideNav();
    window.scrollTo(0,1);

    $(".menuitem").on("click",function(){
        $('.button-collapse').sideNav('hide');
    })

});