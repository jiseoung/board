const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const user_info = require('../../services/user.service/info.service.js');
const jwt = require('../../services/jwt.service.js');

const router = express.Router();
const app = express();

router.use(cookieParser());
app.set('views', path.join(__dirname + '/public/views'));

router.get('/info', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;

    const username = await jwt.verify_jwt(jwt_token).username;
    if (username !== undefined) {
        const user = await user_info.parse_user(username);
        
        res.render('info', { 'user' : user });
    }
})

module.exports = router;