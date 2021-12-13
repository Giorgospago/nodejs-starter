require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const renderPug = require("./library/pug");
const Mailer = require("./library/mailer");
const {SuperLeague} = require("./library/models");

const app = express();
const port = process.env.PORT;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    
    Mailer.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        html: "<h1 style='color: red'>Hello world?</b>",
    });
    
    res.json({
        success: true,
        message: "Hello Delta !!!!!"
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

    Mailer.sendMail({
        from: '"Super League Admin" <info@superleague.gr>',
        to: "teams@superleague.gr",
        subject: `Team ${team.name} just created.`,
        html: renderPug(__dirname + "/pugs/welcome.pug", {
            name: team.name,
            points: team.points,
            logo: team.logo
        })
    });

    res.json({
        success: true,
        message: "Created successfully"
    });
});

app.get("/search", (req, res) => {  
    const key = req.query.key;

    SuperLeague
        .find({
            name: {$regex: key, $options: "i"}
        })
        .sort({points: -1})
        .then(teams => {
            res.json({
                success: true,
                message: "Search results",
                data: teams
            });
        });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});