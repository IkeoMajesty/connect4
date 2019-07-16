(function() {
    var currentPlayer = "player1";

    $(".column").on("click", function(e) {
        var slotsInCol = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                break;
            }
        }
        slotsInCol.eq(i).addClass(currentPlayer);
        if (checkForVictory(slotsInCol)) {
            // do victory dance
        } else {
            var slotsInRow = $(".row" + i);
            if (checkForVictory(slotsInRow)) {
                // do victory dance
            } else {
            }
        }

        switchPlayers();
    });

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
})();
