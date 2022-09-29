document.getElementById("story-button").addEventListener("click", makeStory);
//Diana visited the beautiful Barcelona
function makeStory() {
    let place = document.getElementById("places").value;
    let characteristics = document.getElementById("characteristics").value;
    let people = document.getElementById("people").value;
    let story = people.concat(` visited the ${characteristics}  ${place} .`);
    document.getElementById("story").textContent = story;
    console.log(story);
}