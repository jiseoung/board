const express = require('express');
const path = require('path');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const index_router = require(__dirname + '/src/controllers/index.controllers.js');
const register_router = require(__dirname + '/src/controllers/user.controllers/register.controllers.js');
const login_router = require(__dirname + '/src/controllers/user.controllers/login.controllers.js');
const logout_router = require(__dirname + '/src/controllers/user.controllers/logout.controllers.js');
const info_router = require(__dirname + '/src/controllers/user.controllers/info.controllers.js');

const board_index_router = require(__dirname + '/src/controllers/board.controllers/board_index.controllers.js');
const board_write_router = require(__dirname + '/src/controllers/board.controllers/board_write.controllers.js');
const board_show_router = require(__dirname + '/src/controllers/board.controllers/board_show.controllers.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));
app.use("/public/js", express.static(path.join(__dirname + "/public/js" )));

app.use('/', index_router);
app.use('/user', register_router);
app.use('/user', login_router);
app.use('/user', logout_router);
app.use('/user', info_router);
app.use('/board', board_index_router);
app.use('/board', board_write_router);
app.use('/board', board_show_router);

app.listen(port, () => {
    console.log('hi');
    console.log(port);
});