require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello Heroku"
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});