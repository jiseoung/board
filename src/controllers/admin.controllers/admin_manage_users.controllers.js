const express = require('express');
const path = require('path');

const check_admin = require('../../middlewares/check_admin.middleware.js');
const manage_users = require("../../services/admin.service/manage_users.service.js");

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));

router.get('/manage_users', check_admin, async (req, res) => {
    const user_list = await manage_users.user_list();

    res.render('admin_manage_users', { 'user_list' : user_list });
})

module.exports = router;