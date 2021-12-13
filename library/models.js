const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const SuperLeague = mongoose.model("SuperLeague", {
    name: {type: String},
    logo: {type: String},
    points: {type: Number},
    deleted: {type: Boolean, default: false}
});

module.exports = {
    SuperLeague
};