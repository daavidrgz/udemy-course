
function rollDice() {
	var player1 = Math.floor(Math.random() * 6) + 1;
	var player2 = Math.floor(Math.random() * 6) + 1;

	var emoji = ["🥳", "🎉", "🥇", "🏆"];
	var numEmoji = Math.floor(Math.random() * 4);

	document.querySelector(".dice-player-1").setAttribute("src", "images/dice" + player1 + ".svg");
	document.querySelector(".dice-player-2").setAttribute("src", "images/dice" + player2 + ".svg");

	if ( player1 > player2 )
		document.querySelector(".title").textContent = "Player 1 wins! " + emoji[numEmoji];
	else if (player1 < player2 )
		document.querySelector(".title").textContent = "Player 2 wins! " + emoji[numEmoji];
	else
		document.querySelector(".title").textContent = "It's a draw! 😯";
}
