const express = require('express');
const path = require('path');
const cron = require('node-cron');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const manage_view = require(__dirname + '/src/middlewares/board_manage_view.middleware.js');

const index_router = require(__dirname + '/src/controllers/index.controllers.js');
const register_router = require(__dirname + '/src/controllers/user.controllers/register.controllers.js');
const login_router = require(__dirname + '/src/controllers/user.controllers/login.controllers.js');
const logout_router = require(__dirname + '/src/controllers/user.controllers/logout.controllers.js');
const info_router = require(__dirname + '/src/controllers/user.controllers/info.controllers.js');
const change_info_router = require(__dirname + '/src/controllers/user.controllers/change_info.controllers.js');
const change_pw_router = require(__dirname + '/src/controllers/user.controllers/change_pw.controllers.js');
const reset_pw_router = require(__dirname + '/src/controllers/user.controllers/reset_pw.controllers.js');

const board_index_router = require(__dirname + '/src/controllers/board.controllers/board_index.controllers.js');
const board_write_router = require(__dirname + '/src/controllers/board.controllers/board_write.controllers.js');
const board_show_router = require(__dirname + '/src/controllers/board.controllers/board_show.controllers.js');
const board_modify_router = require(__dirname + '/src/controllers/board.controllers/board_modify.controllers.js');
const board_delete_router = require(__dirname + '/src/controllers/board.controllers/board_delete.controllers.js');
const board_comment_router = require(__dirname + '/src/controllers/board.controllers/board_comment.controllers.js');

const admin_index_router = require(__dirname + '/src/controllers/admin.controllers/admin_index.controllers.js');
const admin_manage_users_router = require(__dirname + '/src/controllers/admin.controllers/admin_manage_users.controllers.js');
const admin_reported_writes_router = require(__dirname + '/src/controllers/admin.controllers/admin_reported_writes.controllers.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));
app.use("/public/js", express.static(path.join(__dirname + "/public/js" )));
app.use("/public/css", express.static(path.join(__dirname + "/public/css" )));

app.use('/', index_router);

app.use('/user', register_router);
app.use('/user', login_router);
app.use('/user', logout_router);
app.use('/user', info_router);
app.use('/user', change_info_router);
app.use('/user', change_pw_router);
app.use('/user', reset_pw_router);

app.use('/board', board_index_router);
app.use('/board', board_write_router);
app.use('/board', board_show_router);
app.use('/board', board_modify_router);
app.use('/board', board_delete_router);
app.use('/board', board_comment_router);

app.use('/admin', admin_index_router);
app.use('/admin', admin_manage_users_router);
app.use('/admin', admin_reported_writes_router);

cron.schedule('0 0 * * *', async () => {
    await manage_view.reset();
    console.log('manage_view reset complete');
});

app.listen(port, () => {
    console.log('hi');
    console.log(port);
});