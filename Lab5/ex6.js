Array.prototype.myReduce = function (callbackFunction, initialVal) {
    const array = this;
    let accumulator = (initialVal === undefined) ? undefined : initialVal;

    let newArray = [];

    for (let index = 0; index < array.length; index++) {
        accumulator = callbackFunction(accumulator, array[index]);

    }
    return accumulator;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log([1, 2, 3, 4].reduce(reducer)); // 10
console.log([1, 2, 3, 4].myReduce(reducer, 0)); // 10
