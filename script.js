$(document).ready(function () {
    $("body").on("click", "button", function (event) {
        event.preventDefault();
        $("img").remove();
        $("p").remove();
        var term = $(this).attr("data-choice");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            term + "&api_key=vTlYVtqEsNkcr4Wrvp06K58dkQZyCTbT&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var newImage = $("<img>");
                    var imageSource = results[i].images.fixed_height.url;
                    newImage.attr("data-animate", imageSource);
                    newImage.attr("data-still", imageSource.replace(".gif", "_s.gif"));
                    newImage.attr("src", results[i].images.fixed_height.url);
                    newImage.attr("data-state", "animate");
                    $("body").append(newImage);
                    $("body").append(p);
                }
            });
    });

    $("body").on("click", "img", function (event) {
        event.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var newButton = $("<button>");
        newButton.attr("data-choice", $("#newInput").val());
        newButton.text($("#newInput").val());
        $("#buttons").append(newButton);
    })

});