//Exercise2 
var movie = {
  title: "The Godfather",
  duration: 177,
  actors: ["Marlon Brando", "Al Pacino", "James Caan", "Richard Castellano"]
};
function myfunction(movie) {
  return `"${movie.title}" running time is ${movie.duration} minutes. Starring: ${movie.actors[0]}, ${movie.actors[1]}, ${movie.actors[2]}, ${movie.actors[3]}"`;
}
console.log(myfunction(movie));
