var buttonArray = ["Tacos", "Burritos", "Diet Coke", "Pizza", "Mountain Dew", "Soup", "Sprite", "Hamburger", "Beer", "Hotdogs", "French Fries", "Milk Shake", "Pepsi"];

function renderButtons(){
    $("#buttons").empty();
    for(var i = 0; i < buttonArray.length; i++){
       
        var a = $("<button>");
        a.addClass("gif");
        a.attr("data-name", buttonArray[i]);
        a.text(buttonArray[i]);
        $("#buttons").append(a);

    }
};

renderButtons();

$("#gif-add").on("click", function(event){
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    buttonArray.push(gif);
    renderButtons();
})