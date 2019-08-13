//array of buttons to display on when page is loaded
var buttonArray = ["Tacos", "Burritos", "Diet Coke", "Pizza", "Mountain Dew", "Soup", "Sprite", "Hamburger", "Beer", "Hot Dogs", "French Fries", "Milk Shake", "Pepsi"];

//creates button in html
function renderButtons(){
    $("#button-display").empty(); // this deletes button before adding new ones

    for(var i = 0; i < buttonArray.length; i++){

        var a = $('<button class="btn btn-light">');
        a.addClass("gif-btn");
        a.attr("data-name", buttonArray[i]);
        a.text(buttonArray[i]);
        $("#button-display").append(a);



        // Event listener for all button elements
        $(".gif-btn").on("click", function () {
            $("#gif-display").empty();
            //"this" keyword refers to the button that was clicked
            var gif = $(this).attr("data-name");

            // Constructing a URL to search Giphy for the gif
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=PG";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) { // After the data comes back from the API

                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div for the gif
                        var gifDiv = $('<div>');

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var gifImage = $('<img id="gif-img">');

                        gifImage.attr("src", results[i].images.fixed_height.url);

                        gifDiv.append(p);
                        gifDiv.append(gifImage);
                        $("#gif-display").append(gifDiv);
                    }
                }
            });
        });

    }
};


//click function for adding button
$("#gif-add").on("click", function(event){
    event.preventDefault();

    var gifButton = $("#gif-input").val().trim();
    buttonArray.push(gifButton);
    renderButtons();
});

//calls renderButtons function so predefined buttons display
renderButtons();






 
