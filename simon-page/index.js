/*jshint esversion: 6 */

$(".your-turn").fadeOut(0); // Start hidding the "Your Turn" text
$("#crown-img").fadeOut(0);
$("#quit-button").slideUp(0);
document.querySelector("#bg-music").volume = 0.2; // Setting the vol of the bg music

var loopVar;
var testVar;
var keys = ["red-key", "blue-key", "green-key", "yellow-key"];
var roundKeys = [];
var numGames = 0;

var isFollowingOn = false;
function toggleFollowing() {
	if ( !isFollowingOn )
		$("html").on("mousemove",(event) => followMouse(event));
	else
		$("html").off("mousemove");
	isFollowingOn = !isFollowingOn;
}

var arrowPos = $("#arrow-img").position();
function followMouse(event) {
	var distX = event.pageX - arrowPos.left;
	var distY = -event.pageY + arrowPos.top;
	var distD = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
	var cos = distX/distD;
	var sen = distY/distD;
	var grades;
	if ( cos < 0 )
		grades = Math.PI-Math.asin(sen);
	else
		grades = Math.asin(sen);

	$("#arrow-img").css("transform", "rotate(" + (-grades+Math.PI/5) + "rad)");
}

function playGame() {
	loopVar = 0;
	testVar = 0;
	$(".key").off("click");
	$(".your-turn").fadeOut(200);

	roundKeys.push(keys[Math.floor(Math.random() * 4)]);
	showCurrentRound();

	setTimeout(function(){
		myLoop(); // Illuminate the keys
	}, 500);
	
	setTimeout(function(){
		testUser();
	}, roundKeys.length * 800);
}

function playGameButton() {
	document.querySelector("#bg-music").volume = 0.1;
	if ( numGames != 0 ) {
		toggleSaturationFilter();
	}
	roundKeys = []; // Restart the roundKeys var
	$("#quit-button").slideUp(200); // Remove the Quit Button
	$("#start-button").slideUp(200); // Remove the Start Button
	$(".game-over").slideUp(100); // Remove the Game Over div
	playGame();
}

function testUser() {
	$(".key").on("click", function(event) {
		testCorrectKey(event);
	});
	showYourTurn();
}

function showCurrentRound() {
	$(".current-round").addClass("fade-in");
	setTimeout(function() {
		$(".current-round").removeClass("fade-in");
		$(".current-round").text("Round " + roundKeys.length);
	}, 400);	
}

function showYourTurn() {
	var colors = ["#be2431b6", "rgb(49, 163, 74)", "#0f1123c9"];
	$(".your-turn").css("transform", "rotate(" + (Math.floor(Math.random() * 90) - 55) + "deg)");
	$(".your-turn").css("border-color", colors[Math.floor(Math.random() * 3)]);
	$(".your-turn").slideDown(300);
	// moveYourTurn();
}

// function moveYourTurn() {
// 	console.log($(".your-turn").css("transform"));
// 	$(".your-turn").css("transform", "rotate(2deg)");
// 	setTimeout(function() {
// 		$(".your-turn").css("transform", "rotate(-2deg)");
// 		setTimeout(function() {
// 			moveYourTurn();
// 		}, 900);
// 	},900);
// }

function testCorrectKey(event) {
	var keyPressed = event.target.id;
	if ( keyPressed != roundKeys[testVar] )
		gameOver();

	else {
		$("#" + keyPressed).addClass("key-pressed");
		var sound = new Audio(event.target.getAttribute("sound"));
		sound.play();
		setTimeout(function() {
			$("#" + keyPressed).removeClass("key-pressed");
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

function toggleMute() {
	if ( document.querySelector("#bg-music").paused ) {
		document.querySelector("#bg-music").play();
		$("#bar-to-mute").slideUp(100);

	} else {
		document.querySelector("#bg-music").pause();
		$("#bar-to-mute").slideDown(100);
	}	
}

function gameOver() {
	showScores(roundKeys.length);
	$("#crown-img").fadeIn(300);

	$(".key").off("click");
	numGames++;
	$(".game-over").slideDown(100);
	toggleSaturationFilter(); // Desaturate all the elements
	document.querySelector("#bg-music").volume = 0; // Mute the bg music
	var gameOverMusic = new Audio("sounds/game-over.wav");
	gameOverMusic.volume = 0.4;
	gameOverMusic.play();

	animate({animation: makeEaseOut(bounce), draw: function(progress){
		$(".game-over").css("top", (progress * 64 - 30) + "%");
	}, duration: 1500});

	setTimeout(function() {
		$("#start-button").text("Retry");
		$("#start-button").slideDown(300);
		$("#quit-button").slideDown(300);
	}, 2000);
}

function toggleSaturationFilter() {
	$("body").find('*').toggleClass("desaturated");
	$(".game-over").removeClass("desaturated");

	$(".buttons-container").removeClass("desaturated");
	$("#start-button").removeClass("desaturated");
	$("#quit-button").removeClass("desaturated");
}

function animate({animation, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if ( timeFraction > 1 )
            timeFraction = 1;

        // calculate the current animation state
        let progress = animation(timeFraction);

        draw(progress); // draw it

        if ( timeFraction < 1 ) {
            requestAnimationFrame(animate);
        }
    });
}

function makeEaseOut(timing) {
	return function(timeFraction) {
	  return 1 - timing(1 - timeFraction);
	};
}
function bounce(timeFraction) {
    for ( let a = 0, b = 1; 1; a += b, b /= 2 ) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}

var bestGames = [];
function showScores(round) {

	bestGames.push(round);
	bestGames.sort(function(a,b) {
		return b - a;
	});
	for ( i = 0; i < 3; i++ ) {
		if ( i < bestGames.length )
			$("#score" + (1+i) + " span").text((i+1) + ".- Round " + bestGames[i]);
	}
}

var scoreOn = false;
function toggleScoreTable() {
	if ( !scoreOn )
		$(".scores-container").css("right", "5%");
	else
		$(".scores-container").css("right", "");
	scoreOn = !scoreOn;
}

function exitGame() {
	document.querySelector("#bg-music").volume = 0.2;
	toggleSaturationFilter();
	numGames = 0;

	$(".your-turn").fadeOut(200);
	$(".current-round").addClass("fade-in");
	$(".game-over").slideUp(100);
	$("#quit-button").slideUp(200);
	$("#start-button").slideUp(200);
	$("#start-button").delay(500).slideDown(200);
	setTimeout(function() {
		$("#start-button").text("Continue");
	}, 500);
}
