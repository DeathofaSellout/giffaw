$(document).on("ready", function(){

    $('form').on('submit', function(){

        event.preventDefault();

        $.ajax({
            method: "GET",
            //url: "http://api.giphy.com/v1/gifs/trending", works with no api key on html
            url: "http://api.giphy.com/v1/gifs/search?api_key=VcDR94jKqyEoKfJOkZJdZ0ONyKKciG4O", //https://api.giphy.com/v1/gifs/search?api_key=VcDR94jKqyEoKfJOkZJdZ0ONyKKciG4O
            api_key: "VcDR94jKqyEoKfJOkZJdZ0ONyKKciG4O",
            data: $("form").serialize(),
            success: function(json){
                //remove any images from previous searches, so the page isn't overrun
                var images = document.getElementsByTagName('img');
                for (var i = 0; i < images.length; i++) {
                    images[0].parentNode.removeChild(images[0]);
                }

                console.log(json.data[0].images.fixed_height_small.url);
                json.data.forEach(element => {
                    let url = element.images.fixed_height_small.url;
                    $(".gif-gallery").append( "<img src=" + url + ">");
                });

            },

            // The raw request, its status, and the error
            error: function(xhr, status, error){
                alert("Sorry, there was a problem");
                console.log("Status: " + status);
                console.log("Error: " + error);
            }
        });
    });
});
