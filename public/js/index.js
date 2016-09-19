$(function(){
    // $("body").on("click", "#send", function(){
    //     $.ajax({
    //         url:"/addFilm",
    //         data:{
    //             name:$("#filmName").val(),
    //             year:$("#year").val()
    //             // actors:["John Davis", "Maya Miller", "Nataly Johnes"]
    //         },
    //         dataType:"json"
    //     }).done(function(response){
    //         console.log(response);
    //         $("#filmsContent").append('<div class="row">\
    //         <div class="col-md-3 col-sm-3 col-xs-12">' + response.name + '</div>\
    //         <div class="col-md-2 col-sm-2 col-xs-12">' + response.year + '</div>\
    //     </div>');
    //     }).fail(function(jqXHR, textStatus, errorThrown){
    //         console.log(errorThrown);
    //     });
    // });

    $(".additional").on("click", ".arrow_", function(){
        if($(".additional").hasClass("on")){
            $(".additional").animate({
                width:"30px"
            }, 300)
            .removeClass("on");
            $(".arrow_")
                .css("border", "15px solid transparent")
                .css("border-right", "20px solid #fff")
                .css("left", "-5px");
            $(".additional").find(".row").fadeOut();
        }
        else{
            $(".additional").animate({
                width:"300px"
            }, 300)
            .addClass("on");
            $(".arrow_")
                .css("border", "15px solid transparent")
                .css("border-left", "20px solid #fff")
                .css("left", "10px");
            $(".additional").find(".row").fadeIn();
        }
    });
});