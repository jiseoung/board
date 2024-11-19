const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const user_info = require('../../services/user.service/info.service.js');
const jwt = require('../../services/jwt.service.js');

const router = express.Router();
const app = express();

router.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/info', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    if (username !== undefined) {
        const user = await user_info.parse_user(username);
        
        res.render('info', { 'user' : user });
    }
})

router.delete('/info/withdraw_user', async (req, res) => {
    const { answer } = req.body;
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    try {
        if (answer) {
            await user_info.withdraw_user(username);
            res.clearCookie('jwt_token').send('ok');
        }
    } catch (e) {
        console.log('/info/withdraw_user error : ' + e);
    }
})

module.exports = router;