const {SuperLeague} = require("../library/models");
const renderPug = require("../library/pug");
const Mailer = require("../library/mailer");

const fetchTeams = (req, res) => {
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
};
const fetchTeam = (req, res) => {
    SuperLeague
        .findById(req.params.teamId)
        .then(team => {
            res.json({
                success: true,
                message: team.name + " fetched successfully",
                data: team
            });
        });
};
const deleteTeam = (req, res) => {
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
};
const updateTeam = (req, res) => {
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
};
const createTeam = (req, res) => {
    const obj = {
        name: req.body.name,
        points: req.body.points,
        logo: process.env.HOST + "/uploads/" + req.file.filename
    };
    const team = new SuperLeague(obj);
    team.save();

    Mailer.sendMail({
        from: '"Super League Admin" <info@superleague.gr>',
        to: "teams@superleague.gr",
        subject: `Team ${team.name} just created.`,
        html: renderPug(__dirname + "/../pugs/welcome.pug", {
            name: team.name,
            points: team.points,
            logo: team.logo
        })
    });

    res.json({
        success: true,
        message: "Created successfully"
    });
};
const searchTeams = (req, res) => {  
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
};

module.exports = {
    fetchTeams,
    fetchTeam,
    createTeam,
    deleteTeam,
    updateTeam,
    searchTeams
};