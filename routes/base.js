const route = require("express").Router();
const multer = require("multer");
const path = require("path");

const HomeController = require('../controllers/HomeController');
const TeamController = require('../controllers/TeamController');
const CommonMiddleware = require('../middlewares/CommonMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const parsed = path.parse(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + parsed.ext)
    }
});


const upload = multer({
    // dest: path.join(__dirname, "../uploads/")
    storage
});

route.get("/", CommonMiddleware.checkUserAgent, HomeController.hello);
route.get("/superleague", TeamController.fetchTeams);
route.get("/superleague/:teamId", TeamController.fetchTeam);
route.delete("/superleague/:teamId", TeamController.deleteTeam);
route.put("/superleague/:teamId", TeamController.updateTeam);
route.post("/create", upload.single("logo"), TeamController.createTeam);
route.get("/search", TeamController.searchTeams);
route.get("/joke", HomeController.joke);


module.exports = route;