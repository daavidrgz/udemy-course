var keys = document.querySelectorAll(".key");
for ( var i = 0; i < keys.length; i++ )
	keys[i].addEventListener("click", handleClick);

document.addEventListener("keydown", (event) => handleKeyPressed(event));

function handleClick() {
	var sound = new Audio(this.getAttribute("sound"));
	sound.play();
	
	var thisElement = this;
	setTimeout(function() {
		thisElement.classList.remove("key-pressed");
	}, 100, thisElement); 
	
}



function handleKeyPressed(event) {
	document.querySelector("#" + event.key).classList.add("key-pressed");
	document.querySelector("#" + event.key).click();
}
