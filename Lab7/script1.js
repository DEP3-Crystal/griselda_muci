function squareNumber(num) {
  var square = num * num;
  console.log('The result of squaring the number ' + num + ' is ' + squareNumber);
  return square;
}

function half(num) {
  var half = num / 2;
  console.log('Half of ' + num + ' is ' + half);
  return half;
}

function percent(num1, num2) {
  var percent = (num1 / num2) * 100;
  console.log(num1 + ' is ' + percent + '% of ' + num2);
  return percent;
}

function areaOfCircle(radius) {
  var area = Math.PI * squareNumber(radius);
  console.log('The area of circle with radius ' + radius + ' is ' + area);
  return area;
}

var squareButton = document.getElementById("square-button");
squareButton.addEventListener("click", function () {
  var numri = document.getElementById("square-input").value;
  document.getElementById("solution").textContent = squareNumber(numri);
});

var halfButton = document.getElementById("half-button");
halfButton.addEventListener("click", function () {
  var num = document.getElementById("half-input").value;
  document.getElementById("solution").textContent = half(num);
});

var percentButton = document.getElementById("percent-button");
percentButton.addEventListener("click", function () {
  var num1 = document.getElementById("percent1-input").value;
  var num2 = document.getElementById("percent2-input").value;
  document.getElementById("solution").textContent = percent(num1, num2);
});


var areaButton = document.getElementById("area-button");
areaButton.addEventListener("keypress", function () {

  var num = document.getElementById("area-input").value;
  document.getElementById("solution").textContent = areaOfCircle(num);
});