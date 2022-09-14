Array.prototype.myMap = function (callbackFunction) {
    const array = this;
    let newArray = [];
    for (let index = 0; index < array.length; index++) {
        newArray.push(callbackFunction(array[index]));

    }
    return newArray
}

function multiplicator(element) {
    return 2 * element;
}

console.log([1, 2, 3].map(multiplicator)); // [2,4,6]
console.log([1, 2, 3].myMap(multiplicator)); // [2,4,6]
