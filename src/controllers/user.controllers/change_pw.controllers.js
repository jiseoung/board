const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('../../services/jwt.service.js');
const change_user = require('../../services/user.service/change_user.service.js');

const router = express.Router();
const app = express();

router.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/info/change/change_pw', (req, res) => {
    res.render('change_pw');
})

router.post('/info/change/change_pw', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;
    const { current_pw, change_pw } = req.body;

    const is_changed = await change_user.change_pw(current_pw, change_pw, username);
    if (is_changed === 'change') {
        res.clearCookie('jwt_token');
        res.send('<script>alert("change succeed. Please Login Again");location.href="/user/login"</script>');
    } 
    else if (is_changed === 'not_change') {
        res.send('<script>alert("failed");</script>');
    }
})

module.exports = router;