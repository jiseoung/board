const express = require('express');
const path = require('path');
const cron = require('node-cron');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

const manage_view = require(__dirname + '/src/middlewares/board_manage_view.middleware.js');

const index_router = require(__dirname + '/src/routes/index.router.js');
const admin_router = require(__dirname + '/src/routes/admin.router.js');
const user_router = require(__dirname + '/src/routes/user.router.js');
const board_router = require(__dirname + '/src/routes/board.router.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/public/views'));
app.use("/public/js", express.static(path.join(__dirname + "/public/js" )));
app.use("/public/css", express.static(path.join(__dirname + "/public/css" )));


app.use(index_router);
app.use(admin_router);
app.use(user_router);
app.use(board_router);

cron.schedule('0 0 * * *', async () => {
    await manage_view.reset();
    console.log('manage_view reset complete');
});

app.listen(port, () => {
    console.log('hi');
    console.log(port);
});