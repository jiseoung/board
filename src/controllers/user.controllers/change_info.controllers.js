const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const jwt = require('../../services/jwt.service.js');
const user_info = require('../../services/user.service/info.service.js');
const change_user = require('../../services/user.service/change_user.service.js');

const router = express.Router();
const app = express();

router.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/info/change/change_info', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    const user = await user_info.parse_user(username);

    res.render('change_info', { 'user' : user });
})

router.post('/info/change/change_info', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;
    const before_username = await jwt.verify_jwt(jwt_token).username;
    const { id, username, email } = req.body;

    const result = await change_user.change_info(id, username, email, before_username);

    if (result === 'duplicate_id') {
        res.send('<script>alert("duplicate ID");location.href="/user/info/change/change_info";</script>');
    }
    else if (result === 'duplicate_username') {
        res.send('<script>alert("duplicate USERNAME");location.href="/user/info/change/change_info";</script>');
    }
    else {
        res.send('<script>alert("change complete. Login Again");location.href="/user/login";</script>');
    }
})

module.exports = router;