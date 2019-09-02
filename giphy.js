$(document).ready(function(){
  
  var gifs = ["Cry","Pout", "Laugh"];


  function searchGifs(gifSearch){
      var queryURL = "https://api.giphy.com/v1/gifs/search?q="  + gifSearch + "&api_key=k6cGtGdH5airFQmgIByS8YtiY8hNtBm1&limit=10";
      
      $.ajax({
        url: queryURL,
        method: "GET"
      }) 
        .then(function(response) {

        //add attributes to all gifs for loacation, pausing, and ratings
        
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var gifImage = $("<img>");
              gifImage.attr("src", results[i].images.fixed_height.url);
              gifImage.attr("src", response.data[i].images.original_still.url)
              gifImage.attr("data-still", response.data[i].images.original_still.url)
              gifImage.attr("data-moving", response.data[i].images.original.url)
              gifDiv.append(p);
              gifDiv.append(gifImage);
              $("#gifs-info").prepend(gifDiv);

        //gifs on click will pause/play

              gifImage.on("click", function(){
              if ($(this).attr("data-still") == $(this).attr("src")) {
              $(this).attr("src", $(this).attr("data-moving"))
              }
              else { 
              $(this).attr("src", $(this).attr("data-still"))
              }
             })

            }
          }   
                   
        });  
        
    };

    //clicking search

    $("#select-gif").on("click", function(event) {
    event.preventDefault();
    var inputGif = $("#gif-input").val().trim();
    searchGifs(inputGif);
    });
    


    //rendering new search buttons

      function renderButtons(item) {  
        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) {
          var a = $("<button>");
          a.addClass("gif-btn");
          a.attr("data-gif", gifs[i]);
          a.text(gifs[i]);
          $("#buttons-view").append(a);
        }
      } 
 
      $("#select-gif").on("click", function(event) {
        event.preventDefault();
        var giphy = $("#gif-input").val().trim();
        gifs.push(giphy);
        renderButtons();
      });

      $(document).on("click", ".gif-btn", function(event) {
        event.preventDefault();
        var btnGif = $(this).attr("data-gif");
        searchGifs(btnGif);
      });

      renderButtons();
    });


  

