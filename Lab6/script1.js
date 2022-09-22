var movie = [{
  title: "The Godfather",
  duration: 177,
  actors: ["Marlon Brando", "Al Pacino", "James Caan", "Richard Castellano"],
  viewed: false

}, {
  title: "No mask no entry",
  duration: 177,
  actors: ["aaa", "bb", "cc", "dd"],
  viewed: true
}];

for (let index = 0; index < movie.length; index++) {
  var movieParagraph = document.createElement("p");
  var movieTitle = document.createTextNode(movie[index].title);
  movieParagraph.appendChild(movieTitle);
  document.body.appendChild(movieParagraph);
}

var myfilm = document.createElement("ul");
for (var i = 0; i < movie.length; ++i) {
  var titles = document.createElement("li");
  var innerLists = document.createElement("ul");
  var duration = document.createElement('li');
  var actors = document.createElement('li');
  var viewed = document.createElement('li');


  titles.innerHTML = "tittle: ".concat(movie[i].title);
  duration.innerHTML = "duration: ".concat(movie[i].duration);
  actors.innerHTML = "actors: ".concat(movie[i].actors);
  viewed.innerHTML = "viewed: ".concat(movie[i].viewed);

  var filmimages = document.createElement('img');
  filmimages.style.width = "200px";

  if (movie[i].viewed) {
    viewed.style.color = "green";
  }

  if (movie[i].title === "The Godfather") {
    filmimages.setAttribute("src", "https://dictionary.cambridge.org/fr/images/full/poster_noun_002_28550.jpg?version=5.0.252");
  }
  else {
    filmimages.setAttribute("src", "https://m.media-amazon.com/images/I/61DcWkGukrL._AC_SS450_.jpg");
  }

  innerLists.append(duration, actors, viewed);
  titles.append(innerLists);
  myfilm.append(filmimages, titles);

}
document.body.append(myfilm);








