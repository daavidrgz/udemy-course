/*jshint esversion: 6 */

$(".your-turn").fadeOut(0); // Start hidding the "Your Turn" text
$(".current-round").slideUp(0); // Start hidding the "Current Round" text
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
	$(".start-game-button").slideUp(200); // Remove the Start Button
	$(".game-over").slideUp(100);
	if ( numGames != 0 && testVar == roundKeys.length )
		toggleSaturationFilter();
	document.querySelector("#bg-music").volume = 0.1;

	roundKeys.push(keys[Math.floor(Math.random() * 4)]);
	showCurrentRound();

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
	showYourTurn();
}

function showCurrentRound() {
	$(".current-round").slideUp(200);
	$(".current-round").delay(500).slideDown(200);
	setTimeout(function() {
		$(".current-round").text("Round " + roundKeys.length);
	}, 500);	
}

function showYourTurn() {
	var colors = ["#be2431b6", "rgb(49, 163, 74)", "#0f1123c9"];
	$(".your-turn").css("transform", "rotate(" + (Math.floor(Math.random() * 90) - 45) + "deg)");
	$(".your-turn").css("border-color", colors[Math.floor(Math.random() * 3)]);
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
	$(".key").off("click");
	numGames++;
	$(".game-over").slideDown(100);
	toggleSaturationFilter();
	document.querySelector("#bg-music").volume = 0;
	var gameOverMusic = new Audio("sounds/game-over.wav");
	gameOverMusic.volume = 0.4;
	gameOverMusic.play();

	animate({animation: makeEaseOut(bounce), draw: function(progress){
		$(".game-over").css("top", (progress * 95 - 60) + "%");
	}, duration: 1500});
	roundKeys = [];
	setTimeout(function() {
		$(".start-game-button").text("Retry");
		$(".start-game-button").slideDown(300);
	}, 2000);
}

function toggleSaturationFilter() {
	$("body").find('*').toggleClass("desaturated");
	$(".game-over").removeClass("desaturated");
	$(".start-game-button").toggleClass("desaturated");
	$(".start-game-button").css("background-color", "#fbfaf0");
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
