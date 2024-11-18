const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const jwt = require('../../services/jwt.service.js');
const user_info = require('../../services/user.service/info.service.js');

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

    const changed_jwt_token = await user_info.change_info(id, username, email, before_username);
    if (changed_jwt_token) {

        res.cookie('jwt_token', changed_jwt_token, { httpOnly: true });
        res.send('<script>alert("change succeeded");location.href="/user/info";</script>')
    }
})

module.exports = router;