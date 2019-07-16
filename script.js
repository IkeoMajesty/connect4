(function() {
    var yScore = parseInt(localStorage.getItem("yellow"));
    var redScore = parseInt(localStorage.getItem("red"));
    if (!yScore){
        yScore=0
    }
    if (!redScore){
        redScore=0
    }
    var html = "PLAYER 1: " + redScore;
    var html2 = "PLAYER 2: " + yScore;
    var winner = "";
    var currentPlayer = "p1";
    var colors = $(".hole");
    $("#h21").append(html);
    $("#h22").append(html2);
    console.log("colors", colors);
    //token animation
    $(".button").on("mouseover", function(e) {
        if (currentPlayer == "p1") {
            $(e.target).addClass("element-animation");
        } else {
            $(e.target).addClass("element-animation1");
        }
    });
    $(".button").on("mouseout", function(e) {
        $(e.target).removeClass("element-animation");
        $(e.target).removeClass("element-animation1");
    });
    //click()
    $(".button").on("click", function(e) {
        var outbreak;
        e.preventDefault;
        console.log(e.target.id);
        var column = "";
        var targetID = e.target.id;
        console.log(targetID);
        switch (targetID) {
                        case "b1":
                            column = "div.column1 > div.hole";
                            break;
                        case "b2":
                            column = "div.column2 > div.hole";
                            break;
                        case "b3":
                            column = "div.column3 > div.hole";
                            break;
                        case "b4":
                            column = "div.column4 > div.hole";
                            break;
                        case "b5":
                            column = "div.column5 > div.hole";
                            break;
                        case "b6":
                            column = "div.column6 > div.hole";
                            break;
                        case "b7":
                            column = "div.column7 > div.hole";
                            break;
                        default:
                            console.log("WTF?");
        }
        console.log($(column));
        var slotsInCol = $(column);
        //check where to put it
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("p1") &&
                !slotsInCol.eq(i).hasClass("p2")
            ) {
                break;
            }
        }
        slotsInCol.eq(i).addClass(currentPlayer);
        //debug
        console.log(
            "ID!" +
                $(slotsInCol.eq(i))
                    .parent()
                    .attr("id")
        );
        outbreak = $(slotsInCol.eq(i))
            .parent()
            .attr("id");
        console.log("outbrak" + outbreak);
        checkForVictory(outbreak, "ver");
        checkForVictory(outbreak, "hor");
        checkForVictory(outbreak, "dia");
        checkForVictory(outbreak, "dia2");
        if (winner == "p1") {
            $("#box1").css("left", "25%");
            $("#box").css("left", "0%");
            $("#cover").css("left", "0%");
            localStorage.setItem("red", redScore + 1);
            $("#cover").click(function() {
                location.reload(true);
            });
        } else if (winner == "p2") {
            $("#box2").css("left", "25%");
            $("#box").css("left", "0%");
            $("#cover").css("left", "0%");
            localStorage.setItem("yellow", yScore + 1);
            $("#cover").click(function() {
                location.reload(true);
            });
        } else {
            $(e.target).removeClass("element-animation1", "element-animation");
            if (currentPlayer == "p1") {
                $(e.target).addClass("element-animation1");
            } else if (currentPlayer == "p2") {
                $(e.target).addClass("element-animation");
            }
            switchPlayers();
        }
    });
    //mapp3r
    function checkForVictory(ou, axis) {
        var victory = "";
        var direction = [];
        // var victoryHor = "";
        // var victoryDia = "";
        // var victoryPattern;
        var o = parseInt(ou);
        var ver = [o, o + 7, o + 14, o + 21];
        var hor = [o - 3, o - 2, o - 1, o, o + 1, o + 2, o + 3];
        var dia = [o - 24, o - 16, o - 8, o, o + 8, o + 16, o + 24];
        var dia2 = [o - 18, o - 12, o - 6, o, o + 6, o + 12, o + 18];
        if (axis == "ver") {
            direction = ver;
        } else if (axis == "hor") {
            direction = hor;
        } else if (axis == "dia") {
            direction = dia;
        } else if (axis == "dia2") {
            direction = dia2;
        }
        for (var i = 0; i < direction.length; i++) {
            //store it outside of the loop
            if (colors.eq(direction[i] - 1).hasClass(currentPlayer)) {
                console.log("onematch!");
                victory += "w";
            } else {
                victory += "x";
            }
            console.log(axis, victory); // console.log(victory);
        }
        if (/wwww/.test(victory)) {
            winner = currentPlayer;
        }
    } //check for victory
    //switch players and cleanup.
    function switchPlayers() {
        if (currentPlayer == "p1") {
            currentPlayer = "p2";
            $("h1").removeClass("p1T");
            $("h1").addClass("p2T");
            // $("playerInd").addClass("srb");
            $(".button").removeClass("element-animation");
        } else {
            currentPlayer = "p1";
            $("h1").removeClass("p2T");
            $("h1").addClass("p1T");
            $(".button").removeClass("element-animation1");
        }
    } //switch players
})(); //iife
