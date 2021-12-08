require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI);

const SuperLeague = mongoose.model("SuperLeague", {
    name: {type: String},
    logo: {type: String},
    points: {type: Number},
    deleted: {type: Boolean, default: false}
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

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello Delta"
    });
});

app.get("/superleague", (req, res) => {
    SuperLeague
        .find({})
        .sort({points: -1})
        .then(teams => {
            res.json({
                success: true,
                message: "Teams fetched successfully",
                data: teams
            });
        });
});

app.get("/superleague/:teamId", (req, res) => {
    SuperLeague
        .findById(req.params.teamId)
        .then(team => {
            res.json({
                success: true,
                message: team.name + " fetched successfully",
                data: team
            });
        });
});
app.delete("/superleague/:teamId", (req, res) => {
    SuperLeague
        .deleteOne({_id: req.params.teamId})
        .then(result => {
            if (result.deletedCount === 1) {
                res.json({
                    success: true,
                    message: "Deleted successfully"
                });
            } else {
                res.json({
                    success: false,
                    message: "Nothing to delete"
                });
            }
        });
});
app.put("/superleague/:teamId", (req, res) => {
    SuperLeague
        .updateOne(
            {_id: req.params.teamId},
            req.body
        )
        .then(team => {
            res.json({
                success: true,
                message: "Updated successfully"
            });
        });
});

app.post("/create", (req, res) => {
    const team = new SuperLeague(req.body);
    team.save();
    res.json({
        success: true,
        message: "Created successfully"
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});