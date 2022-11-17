const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const { response } = require("express");
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.post("/dogs", (req, res) => {
    const dogsList = readJSONFile();
    const crypto = require("crypto");
    const id = crypto.randomBytes(16).toString("hex");
    let newDog = req.body;
    newDog.id = id; 
    dogsList.push(newDog);
    writeJSONFile(dogsList);
    res.send(201);

});
app.get("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    const id = req.params.id;
    const filteredDogs = dogsList.filter((dog) => dog.id === id)
    if (filteredDogs.length === 0) {
        res.status(404).json({ error: 'Dog not found' });
    }
    res.json(filteredDogs[0]);
});
app.get("/dogs", (req, res) => {
    const dogsList = readJSONFile();
    res.json(dogsList);
});

app.put("/dogs/:id", (req, res) => {
    let dogsList = readJSONFile();
    let id = req.params.id;
    let body = req.body;
    let index = dogsList.findIndex((dog) => dog.id === id);
    if (index != -1) {
        let updateDog = { id: id, ...body };
        dogsList[index] = updateDog
        writeJSONFile(dogsList);
        res.json(dogsList);
    } else {
        res.send(404).send("No dog found!");
    }
});

app.delete("/dogs/:id", (req, res) => {
    const dogsList = readJSONFile();
    const id = req.params.id;
    const filteredDogs = dogsList.filter((dog) => dog.id != id)
    if (filteredDogs.length === 0) {
        res.status(404).json({ error: 'Dog not found' });
    }
    writeJSONFile(filteredDogs);
    res.json({ message: 'Dog deleted' });
});

function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["dogs"];
}
function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ dogs: content }),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

app.listen("5000", () =>
    console.log("Server started at: http://localhost:5000")
);
