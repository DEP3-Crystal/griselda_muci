

document.body.style.fontFamily = "Arial, sans-serif";
document.getElementById('nickname').innerHTML = "Gris";
document.getElementById('favorites').innerHTML = '23';
document.getElementById('hometown').innerHTML = 'Durres, Albania';
var myli = document.getElementsByTagName('li');
for (var i = 0; i < myli.length; i++) {

   myli[i].className = 'listitem';
}
console.log((myli));

var img = document.createElement('img');
img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg?20200423155822';
img.width = 300;
document.body.appendChild(img);


