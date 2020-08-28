// JavaScript function that wraps everything
$(document).ready(function() {
    // Array for words
    var colors = [
        "brown",
        "blue",
        "magenta",
        "teal",
        "coral",
        "black"
    ];

    // This function creates the actual "game" logic.
    function createColorPicker() {
        // Array for word colors
        var colorsOfText = [
            "brown",
            "blue",
            "magenta",
            "teal",
            "coral",
            "black"
        ];

        // Shuffle color array
        for (var i = colors.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = colors[i];
        colors[i] = colors[j];
        colors[j] = temp;
        }        

        // Shuffle text color array
        for (var i = colorsOfText.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = colorsOfText[i];
            colorsOfText[i] = colorsOfText[j];
            colorsOfText[j] = temp;
        }

        //Grab a random color "string" and random color "color"
        var randStringColor = colors[Math.floor(Math.random() * colors.length)];
        var randColor = colors[Math.floor(Math.random() * colors.length)];

        if(randStringColor === randColor){
            $('#rand-target-color').text(colors[1]);
            $('#rand-target-color').css('color', colors[5]);
        } else {        
            $('#rand-target-color').text(randStringColor);
            $('#rand-target-color').css('color', randColor);
        }

        // Loop through all colors and send to HTML as list element
        for (var i = 0; i < colors.length; i++){

            const newWord = $('<li>');
            newWord.text(colors[i]);

            if(colors[i] !== colorsOfText[0]){
                newWord.css('color', colorsOfText[0]);
                colorsOfText.splice(0,1);
            } else {
                newWord.css('color', colorsOfText[1]);
                colorsOfText.splice(1,1);
            }
            $('#color-picker').append(newWord);
        }
        console.log(colorsOfText);
    }


    // Clear the divs and arrays upon each round.
    function clear() {
    $("#rand-target-color").empty();
    $("#color-picker").empty();
    }

    // Function for resetting colors and setting new colors.
    function reset() {
        clear();
        createColorPicker();
    }

    //getting the color of the main word
    var rgb=["rgb(165, 42, 42)","rgb(255, 0, 255)","rgb(0, 0, 0)","rgb(255, 127, 80)","rgb(0, 128, 128)","rgb(0, 0, 255)"];
    var rgbcol=["brown","magenta","black","coral","teal","blue"];
    

    // Get id of element clicked by user
    $("#color-picker").click(function(event) {
        var correctColor = $("#rand-target-color").text();
        var newVar = $("li").css('color');       
        var chosenColorIndex = rgb.indexOf(newVar);
        var chosenColor = rgbcol[chosenColorIndex];

        console.log(correctColor);
        console.log(chosenColor);

        if(correctColor === chosenColor){
            alert("You win!")
            reset();
        } else {
            alert("You lose!")
            reset();
        }
    });

    // Run game
    reset();
});