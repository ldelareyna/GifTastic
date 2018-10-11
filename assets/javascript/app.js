// Created variable to contain string of animals
var topics = ["Dog", "Cat", "Fish"];

// This variable will hold the images of the animals
var animalImage;

// This varibale will hold the rating of the gifs
var rating;

// This function will pull data-animal from variable 
function renderButtons() {

  // Remove the content in the selector buttons
  $("#buttons").empty();

  // Setting the value of the input to empty the box of previously added animals
  $("#animal-input").val("");

  // A for-loop to iterate through the topics array
  for (var i = 0; i < topics.length; i++) {

    // The variable is now equal to button
    var animalBtn = $("<button>");

    // Adding a class too the animalBtn
    animalBtn.addClass("animal-btn");

    // Setting each animalBtn a data-attribute called data-animal
    animalBtn.attr("data-animal", topics[i]);

    // Setting each animalBtn text equal to its name
    animalBtn.text(topics[i]);

    // Append each animalBtn to the buttons div
    $("#buttons").append(animalBtn);

  }
}

// This function displays images of the animal chosen by user and is activated when user clicks animal-btn
function displayImages() {

  // Remove the content in the selectots.
  $("#gifs-appear-here").empty();
  $(".item").empty();

  // The variable animal is the selector being the returned value of the attribute 
  var animal = $(this).attr("data-animal");

  // Call the GIPHY API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=093MlIrtl5XRWe6RoK994ghRyeFPispb&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .done(function (response) {

      var results = response.data;

      // Setting x to the value of 10. (How many total gifs get displayed)
      var x = 10;

      // For loop to display 10 gifs each time the button pressed
      for (var i = 0; i < x; i++) {

        // Variable with a div to put image and rating in
        var gifDiv = $("<div class='item float-left'>");

        // Variable created to hold rating of specific gif
        var rating = results[i].rating;

        // If statement that checks rating 
        // If it is not r or pg-13 rating it will be posted 
        if (rating !== "r" && rating !== "pg-13") {

          // Return rating on html in <p>
          var p = $("<p>").text("Rating: " + rating);

          // Variable animalImage is put into image element
          var animalImage = $("<img>");

          // Set animalImage to src and image information
          animalImage.attr("src", results[i].images.fixed_height_still.url);

          // Set animalImage to data-state information to allow image to be in still state
          animalImage.attr("data-state", "still");

          // Set animalImage to data-still image information to allow image to be in still state
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);

          // Set animalImage to  data-animate image information so when clicked it will play gif
          animalImage.attr("data-animate", results[i].images.fixed_height.url);

          //Add a class to animalImage
          animalImage.addClass("gif");


          // For each image/paragraph prepend to div 
          gifDiv.prepend(animalImage);
          gifDiv.prepend(p);


          // Put image and image div on browser
          $("#gifs-appear-here").prepend(gifDiv);

        }

        // If r or pg-13 rating go back to beginning of loop
        // Get another gif and add another to x until we get a total of 10 gifs
        else {
          x++;
        }

      }

      // Click function on gif to allow user to play the gif
      $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }

        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });

}


// Attach a click event to allows user to add new animal to list
$("#add-animal").on("click", function (event) {

  // Will prevent the submit button from submitting the form
  event.preventDefault();

  // Return the text from the input box and trim spaces entered
  var newTopic = $("#animal-input").val().trim();

  // Takes animal entered from the textbox and adds it to the array of topics
  topics.push(newTopic);

  // Call renderButtons which handles the processing of topics
  renderButtons();

});

// renderButtons function called to display the initial list of animals
renderButtons();

// Click event on the animal-btn
$(document).on("click", ".animal-btn", displayImages);