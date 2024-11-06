const express = require('express');
const path = require('path');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const index_router = require(__dirname + '/src/controllers/index.controllers.js');
const register_router = require(__dirname + '/src/controllers/user.controllers/register.controllers.js');
const login_router = require(__dirname + '/src/controllers/user.controllers/login.controllers.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));

app.use('/', index_router);
app.use('/user', register_router);
app.use('/user', login_router);

app.listen(port, () => {
    console.log('hi');
    console.log(port);
});