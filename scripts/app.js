$(document).on("ready", function(){
    $.ajax({
        method: "GET",
        url: "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
        success: function(trendingGifsJson) {
            console.log(trendingGifsJson);
            var allMyGifs = trendingGifsJson.data;

            allMyGifs.forEach(function(gifObj) {
                // find each gif's image URL
                var gifImageUrl = gifObj.images.original.url;
                // http://media3.giphy.com/asldfkj;adghas;ga.gif

                // create an image 
                var imageTagICreated = `<img src="${ gifImageUrl }" />`;
                // '<img src="http://media3.giphy.com/asdfasfsafsaf" />'

            //     // append that image to the <div class="gif-gallery"></div>
                $('.gif-gallery').append(imageTagICreated);
            })
        }
    });

    $('form').on('submit', function(e) {
        e.preventDefault();

        // AJAX call should be in here
        $.ajax({
            method: 'GET',
            url: "http://api.giphy.com/v1/gifs/search",
            data: $('form').serialize(), // will send q and api_key in the HTML form
            // http://api.giphy.com/v1/gifs/search?q=dogs&api_key=23425235235235
            success: function(searchResultsJson) {
                $('.gif-gallery').empty();
                
                var allMyGifs = searchResultsJson.data;

                allMyGifs.forEach(function(gifObj) {
                    // find each gif's image URL
                    var gifImageUrl = gifObj.images.original.url;
                    // http://media3.giphy.com/asldfkj;adghas;ga.gif

                    // create an image
                    var image = `<img src="${ gifImageUrl }" />`;

                    // append that image to the <div class="gif-gallery"></div>
                    $('.gif-gallery').append(image);
                })
            }
        })
    })

    // BONUS: When I click on the 'Load More' button...
    $('button#load-more').on('click', function() {
        // I will make an AJAX request for more Trending gifs, 
        // but SKIP THE FIRST 25 (since they're already on the page)
        $.ajax({
            method: 'GET',
            // Still the Trending URL, but WITH OFFSET parameter at the end
            url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&offset=26',
            success: function(moreGifsJson) {
                // Same code as before (you could DRY this up in a refactor)
                var allMyGifs = moreGifsJson.data;

                allMyGifs.forEach(function(gifObj) {
                    // find each gif's image URL
                    var gifImageUrl = gifObj.images.original.url;
                    // http://media3.giphy.com/asldfkj;adghas;ga.gif

                    // create an image
                    var image = `<img src="${ gifImageUrl }" />`;

                    // append that image to the <div class="gif-gallery"></div>
                    $('.gif-gallery').append(image);
                });

                // The only difference: 
                // Hide the "Load More" button after I've loaded more gifs
                $('button#load-more').hide();
            }
        })
    });
});
