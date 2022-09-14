
const blackFridayCart = {
    phone: "350",
    console: "250",
    tv: "450",
    headPhones: "10.60",
    watch: "20.34",
    bag: "22.36"
};

function getCartValue(blackFridayCart) {
    // convert object to key's array
    const values = Object.values(blackFridayCart);
    const sum = (values.reduce((accumulator, value) => { return accumulator + parseFloat(value);}, 0)).toFixed(1);//rounding to one decimal
 return sum;
}


console.log(getCartValue(blackFridayCart));