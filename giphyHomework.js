
// array of words, for buttons that will be automatically uploaded when the page starts
var topics = ["Tennis", "Soccer", "Nascar", "Family Guy", "Dogs", "Ace Ventura", "Steve Carrel",
              "Hillary Clinton", "American Footbal", "NBA", "North Korea", "Metalica", "Borat", "Pizza", "Russians", 
              "Nerd", "Fail", "Instant Karma", "Amy Winehouse"];


      // once the button is clicked, gifs will be displayed        
      function displayGifsPerButtonClick() {

        // get the value of each button, following gifs will be displayed based on what name/value of the button is. 
        var x = $(this).attr("gifName");

        // accessing the api and applying the key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response);
          for (var i = 0; i < response.data.length; i++) {
          // Creating a div to hold the gif
          var gifDiv = $("<div class='gifDiv'>");

                  // these variables are needed to access still or motion gifs
                  // later the opportunity will be given to the user to play or pause the gif. 
                  var still = response.data[i].images.original_still.url;
                  var gif = response.data[i].images.original.url;
                  var image = $("<img>");

                  // giving the url attributes to the same image
                  // one image three attributes, one for source, one for still gif and one for motion gif. 
                  image.attr("src", still);
                  image.attr("data-still", still);
                  image.attr("data-gif", gif);
                  // class needed for the image so it can be accessed later in css for styling. 
                  image.addClass("gif");


                  // getting the rating for each url/gif
                  var rating = response.data[i].rating;
                  // set it to uppercase
                  rating = rating.toUpperCase();
                  // rating will have it's own paragraph to be displayed in. 
                  var ratingPar = $("<p>");
                  // add some text and display rating value
                  ratingPar.text("Rated: " + rating);
                  // add class for css styling
                  ratingPar.addClass("ratingP");
                  // and finally append it to the gif div along with the image. 
                  gifDiv.append(ratingPar);
                  // Appending the image
                  gifDiv.append(image);


                  // Putting the entire gif above the previous gif/prepending it, later on it will be floated left. 
                  $(".gifsDisplay").prepend(gifDiv);   
          
	          }

                    // when the gif is clicked next will happen
                    $(".gif").click(function()
                      {
                              // each gif will get the class for styling in css
                              $(this).addClass("gifClicked");
                              // this will be needed to evaluate if the gif is moving or still
                              var currentSource = this.getAttribute("src");
                              var stillUrl = this.getAttribute("data-still");
                              var gifUrl = this.getAttribute("data-gif");

                              // check if the video is paused and then play it
                              // else if it is moving it will stop when clicked
                              if (currentSource === stillUrl) {
                                  $(this).attr("src", gifUrl); 
                                
                                } else {
                                  $(this).attr("src", stillUrl);   
                                }  
                    });

            // need a separator for each button/gifs group
            $(".gifsDisplay").prepend("<h6 class='lineBreak'>");
            // we will say in the header what is currently being displayed
            $("#headerID").text("Displaying now: " + x + " GIFs");
        });
      }
		
				


// function will display buttons. 
function renderButtons() {

  // empty first so that you can update the button div with a new button. 
	$("#buttonsDump").empty();

  // going through the array and displaying each button. 
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
	 // new button div will be given a class for the styling later in css
		a.addClass("buttonClass");
    // gifName attribute is added, what the name is in the array above
    // that name will be the attribute/value of particular button. 
		a.attr("gifName", topics[i]);
    // this will be the text of the button. 
		a.text(topics[i]);

    //  now appending the div with a new button and also adding some space between buttons. 
		$("#buttonsDump").append(a);
		$("#buttonsDump").append(" ");
	}
}


// this button will add a new button to the buttons on the screen
$("#submitButton").on("click", function(event){

	event.preventDefault();
	// here we take the value of the text that user typed in
	var gifName = $("#addButtonText").val().trim();
  // adding button name to the array at the top, so that the new button will be displayed
	topics.push(gifName);
  // once the submit button is clicked, we will clear the text that the user typed in
  // so that we can easily continue to add new buttons, otherwise we would have to delete the input field
  // everytime we want to add a button
  $("#addButtonText").val("");
  // call the function to display buttons and this function will now catch the new button that we just wanted to add
	renderButtons();
});

// once the document is loaded we are going to check when the button is clicked and display 
// gifs accordingly. 
$(document).on("click", ".buttonClass", displayGifsPerButtonClick);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
