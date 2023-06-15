const express = require('express');
const appRoute = require('./routes/rutas.js');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', appRoute);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
