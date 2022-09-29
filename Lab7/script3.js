var movePixels = 10; // number of pixels
var delayMs = 50; // number of miliseconds
var dogTimer = null;
var myinfo = document.getElementById("info");
var speed = null;
var clicked = setTimeout(function () { alert("Session expired!"); }, 30000);;

// Move the image on screen with 10px
function dogWalk() {
  var img = document.getElementsByTagName("img")[0];
  var currentLeft = parseInt(img.style.left);
  img.style.left = currentLeft + movePixels + "px";
  // reset image position to start
  if (currentLeft > window.innerWidth - img.width) {
    img.style.left = "0px";
  }
}
// Call dogWalk function every 50 ms
function startDogWalk() {
  dogTimer = window.setInterval(dogWalk, delayMs);
  myinfo.textContent = movePixels / (delayMs / 1000);
  clearTimeout(clicked);
}

function speedDogWalk() {
  dogTimer = window.setInterval(dogWalk, 10);
  myinfo.textContent = movePixels / (10 / 1000);
  clearTimeout(clicked);
  document.getElementById('start-button').setAttribute("disabled", "disabled");
}

function stopDogWalk() {
  window.clearInterval(dogTimer);
  myinfo.textContent = 0 / (delayMs / 1000);
  clearTimeout(clicked);
}


document.getElementById("start-button").addEventListener("click", startDogWalk);
document.getElementById("speed-button").addEventListener("click", speedDogWalk);
document.getElementById("stop-button").addEventListener("click", stopDogWalk);

var button = document.createElement("Button");
button.id = "reset-button";
button.textContent = "Reset speed";
document.body.appendChild(button);
button.addEventListener("click", resetSpeed);

function resetSpeed() {
  clearInterval(dogTimer);
  startDogWalk();
  myinfo.textContent = movePixels / (50 / 1000);
  clearTimeout(clicked);
}







