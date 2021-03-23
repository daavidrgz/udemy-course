$(".your-turn").fadeOut(0); // Start hidding the "your turn" text
var loopVar;
var testVar;
var keys = ["red-key", "blue-key", "green-key", "yellow-key"];
var roundKeys = [];

function playGame() {
	loopVar = 0;
	testVar = 0;
	$(".key").off("click");
	$(".your-turn").fadeOut(200);
	$(".start-game-button").slideUp(200);
	document.querySelector("#bg-music").volume = 0.05;

	roundKeys.push(keys[Math.floor(Math.random() * 4)]);

	setTimeout(function(){
		myLoop(); // Illuminate the keys
	}, 500);
	
	setTimeout(function(){
		testUser();
	}, roundKeys.length * 800);
}

function testUser() {
	$(".key").on("click", function(event) {
		testCorrectKey(event);
	});
	$(".your-turn").css("transform", "rotate(" + (Math.floor(Math.random() * 90) - 45) + "deg)");
	$(".your-turn").fadeIn(300);
}

function testCorrectKey(event) {
	var keyPressed = event.target.id;
	if ( keyPressed != roundKeys[testVar] )
		gameOver();

	else {
		$("#" + keyPressed).addClass("illuminated-key");
		var sound = new Audio(event.target.getAttribute("sound"));
		sound.play();
		setTimeout(function() {
			$("#" + keyPressed).removeClass("illuminated-key");
			testVar++;
			if ( testVar == roundKeys.length )
				playGame();
			
		}, 200);
	}
}

function myLoop() {
	var sound = new Audio($("#" + roundKeys[loopVar]).attr("sound"));
	sound.play();
	$("#" + roundKeys[loopVar]).addClass("illuminated-key");
	setTimeout(function() {
		$("#" + roundKeys[loopVar]).removeClass("illuminated-key");
	}, 500);
	setTimeout(function() {
		loopVar++;
		if ( loopVar < roundKeys.length )
			myLoop();
	}, 800);
}

function gameOver() {
	alert("game over");
}

function toggleMute() {
	document.querySelector("#bg-music").volume = 0.2;
	if ( document.querySelector("#bg-music").paused ) {
		document.querySelector("#bg-music").play();
		$("#bar-to-mute").slideUp(100);

	} else {
		document.querySelector("#bg-music").pause();
		$("#bar-to-mute").slideDown(100);
	}
		
}
