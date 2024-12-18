const express = require('express');
const path = require('path');

const manage_users = require("../../services/admin.service/manage_users.service.js");

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));
app.use(express.json());

router.get('/manage_users', async (req, res) => {
    const user_list = await manage_users.user_list();

    res.render('admin_manage_users', { 'user_list' : user_list });
})

router.delete('/manage_users/delete', async (req, res) => {
    const { username } = req.body;

    await manage_users.delete_user(username);

    res.send('ok');
})

module.exports = router;