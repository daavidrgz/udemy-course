/*jshint esversion: 6 */

var keys = document.querySelectorAll(".key");
for ( var i = 0; i < keys.length; i++ )
    keys[i].addEventListener("click", handleClick);

document.addEventListener("keydown", (event) => document.querySelector("#" + event.key).click());

function handleClick() {
    this.classList.add("key-pressed");
    var sound = new Audio(this.getAttribute("sound"));
    sound.play();
    
    setTimeout(function(thisElement) {
        thisElement.classList.remove("key-pressed");
    }, 80, this); 
    
}

function handleMenu() {
    var menu = document.querySelector(".menu");
    var text = document.querySelector(".title-text");
    var keyContainer = document.querySelector(".key-container");
    var pageContent = document.querySelector(".page-content");
    
    menu.classList.toggle("menu-active");
    text.classList.toggle("menu-active");
    keyContainer.classList.toggle("menu-active");
    pageContent.classList.toggle("menu-active");
}

function addElement(element) {
    createKey(element.getAttribute("bind-key"), element.getAttribute("sound"), element.getAttribute("instrument"));

    // Remove the sound from the menu
    animate({timing: bowShootingAnimation, 
    draw: function(progress) {
        element.parentElement.style.right = progress * 200 + "px";
    }, duration: 400});

    setTimeout(function() {
        element.parentElement.remove();
    createSelectedElement(element);
    }, 500);
}

function removeElement(element) {
    var divToRemove = document.querySelector("#" + element.getAttribute("bind-key"));
    document.querySelector("#key-container").removeChild(divToRemove); // Removing the key

    // Remove the sound from the menu
    animate({timing: bowShootingAnimation, 
    draw: function(progress) {
        element.parentElement.style.right = progress * 200 + "px";
    }, duration: 400});
    
    setTimeout(function() { // Add the element to the non selected sounds menu
        element.parentElement.remove();
    createNotSelectedElement(element);
    }, 500);
}

function createKey(bindKey, sound, instrument) {
    
    var newDiv = document.createElement("div");

    // Setting div attributes
    newDiv.classList.add("key");
    newDiv.setAttribute("sound", sound);
    newDiv.setAttribute("id", bindKey);

    // Setting p attributes
    var newP = document.createElement("p");
    newP.classList.add("sound-name");
    newP.innerHTML = instrument;

    var newContent = document.createTextNode(bindKey);

    // Append text to the div
    newDiv.appendChild(newP);
    newDiv.appendChild(newContent);

    // Append div to the document
    document.querySelector("#key-container").appendChild(newDiv);

    newDiv.addEventListener("click", handleClick); // Add event listener
}

function createSelectedElement(element) {
    element.classList.add("remove-sound-button");
    element.removeAttribute("onclik");
    element.setAttribute("onclick", "removeElement(this)");

    element.innerHTML = "-";

    document.querySelector(".selected-sounds").appendChild(element.parentElement);

    animate({timing: bowShootingAnimation, 
    draw: function(progress) {
        element.parentElement.style.right = (-progress * 200 + 200) + "px";
    }, duration: 400});
}

function createNotSelectedElement(element) {
    element.classList.remove("remove-sound-button");
    element.removeAttribute("onclik");
    element.setAttribute("onclick", "addElement(this)");

    element.innerHTML = "+";

    document.querySelector(".to-add-sounds").appendChild(element.parentElement);

    animate({timing: bowShootingAnimation, 
    draw: function(progress) {
        element.parentElement.style.right = (-progress * 200 + 200) + "px";
    }, duration: 400});
}

function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if ( timeFraction > 1 )
            timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(progress); // draw it

        if ( timeFraction < 1 ) {
            requestAnimationFrame(animate);
        }
    });
}

function bowShootingAnimation(timeFraction) {
    return Math.pow(timeFraction, 2) * ((3 + 1) * timeFraction - 3);
}

function bounce(timeFraction) {
    for ( let a = 0, b = 1, result; 1; a += b, b /= 2 ) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}
