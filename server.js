require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI);

const SuperLeague = mongoose.model("SuperLeague", {
    name: {type: String},
    logo: {type: String},
    points: {type: Number}
});

/*
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/views/about.html");
});
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});
app.get('/products', (req, res) => {
    res.sendFile(__dirname + "/views/products.html");
});
*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/superleague", (req, res) => {
    SuperLeague
        .find({})
        .sort({points: -1})
        .then(teams => {
            res.json(teams);
        });
});

app.post("/create", (req, res) => {
    const team = new SuperLeague(req.body);
    team.save();
    res.json({success: true});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});