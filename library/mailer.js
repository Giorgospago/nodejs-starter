const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025
});

module.exports = transporter;