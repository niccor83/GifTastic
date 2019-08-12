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

    }
};


//click function for adding button
$("#gif-add").on("click", function(event){
    event.preventDefault();

    var gifButton = $("#gif-input").val().trim();

    buttonArray.push(gifButton);
    renderButtons();
    console.log(renderButtons());
});

//calls renderButtons function so predefined buttons display
renderButtons();



// Event listener for all button elements
$("button").on("click", function () {
    $("#gif-display").empty(); 
    // In this case, the "this" keyword refers to the button that was clicked
    var gif = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=PG";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { // After the data comes back from the API
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);

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

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    gifImage.attr("src", results[i].images.fixed_height.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");


                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gif-display").append(gifDiv);
                }
            }
        });
});

$("#gif-img").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    console.log("you clicked me")
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});