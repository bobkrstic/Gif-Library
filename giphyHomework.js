

var topics = ["Donald Trump", "Soccer", "Train", "Family Guy", "Dogs", "Ace Ventura", "Steve Carrel"];



      function displayMovieInfo() {

        var x = $(this).attr("gifName");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          // Creating a div to hold the gif
          var gifDiv = $("<div class='gifDiv'>");

          var still = response.data[i].images.original_still.url;
          var gif = response.data[i].images.original.url;
          var image = $("<img>");

          image.attr("src", still);
          image.attr("data-still", still);
          image.attr("data-gif", gif);
          image.addClass("gif");



          var rating = response.data[i].rating;
          rating = rating.toUpperCase();
          var ratingPar = $("<p>");
          ratingPar.text("Rating: " + rating);
          ratingPar.addClass("ratingP");
          gifDiv.append(ratingPar);




          // Appending the image
          gifDiv.append(image);

          // Putting the entire movie above the previous movies
          $(".gifsDisplay").prepend(gifDiv);   
          
	     }

                    $(".gif").click(
                     function()
                      {
                              
                              var currentSource = this.getAttribute("src");
                              var stillUrl = this.getAttribute("data-still");
                              var gifUrl = this.getAttribute("data-gif");

                              if (currentSource === stillUrl) {
                                  $(this).attr("src", gifUrl); 
                                
                                } else {
                                  $(this).attr("src", stillUrl);   
                                }  
                    });

            $(".gifsDisplay").prepend("<h5 class='lineBreak'>");
        });
        
      }
		
				



function renderButtons() {

	$("#buttonsDump").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
	
		a.addClass("buttonClass");

		a.attr("gifName", topics[i]);

		a.text(topics[i]);

		$("#buttonsDump").append(a);
		$("#buttonsDump").append(" ");
	}
}

$("#submitButton").on("click", function(event){

	event.preventDefault();
	
	var gifName = $("#addButtonText").val().trim();

	topics.push(gifName);
	renderButtons();
});

$(document).on("click", ".buttonClass", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
