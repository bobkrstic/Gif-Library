

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
          // Creating a div to hold the movie
          var gifDiv = $("<div class='gifDiv'>");

          // Storing the rating data
          // var rating = response.data[i].rating;

          // // Creating an element to have the rating displayed
          // var pOne = $("<div>").text("Rating: " + rating);

          // Displaying the rating
          // gifDiv.append(pOne);

          var imgURL = response.data[i].images.downsized.url;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);


          image.addClass("gif");

          // Appending the image
          gifDiv.append(image);

          // Putting the entire movie above the previous movies
          $(".gifsDisplay").prepend(gifDiv);   

	     }

        //   	$(".playPause").on("click", function(){

    				// console.log("something");

    				// $(this).stop();
       	// 			 // function()
        // 				// {
        // 				  var src = $(this).attr("src");
        // 				  $(this).attr("src", src.replace(/\.gif$/i, ".img"));
       	// 				//  },
       	// 			 // function()
       	// 				//  {
       	// 				//    var src = $(this).attr("src");
        // 				//   $(this).attr("src", src.replace(/\.jpg$/i, ".gif"));
        // 		});


        //$(document).ready(function()
// {
    $(".gif").click(
        function()
        {
          // var src = $(this).attr("src");
          // $(this).attr("src", src.replace(/\.gif$/i, ".png"));
          $(this).hidden();
        // },
        // function()
        // {
        //   var src = $(this).attr("src");
        //   $(this).attr("src", src.replace(/\.png$/i, ".gif"));
        });
// });




        });


        // $(document).ready(function()
		// {
    		
		// });


      }
		
				



function renderButtons() {

	$("#buttonsDump").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
	
		a.addClass("gifClass");

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

$(document).on("click", ".gifClass", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
