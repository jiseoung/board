const express = require('express');
const path = require('path');

const user_pw = require('../../services/user.service/reset_pw.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/reset_pw', (req, res) => {
    return res.render('reset_pw');
})

router.post('/reset_pw', async (req, res) => {
    const { id, username, email } = req.body;

    const result = await user_pw.reset_pw(id, username, email);

    if (result === 'error') {
        return res.send('<script>alert("ID, username and email do not match");location.href="/user/reset_pw";</script>');
    }
    else if (result === 'reset_complete') {
        return res.clearCookie('jwt_token').send('<script>alert("Password reset email has been sent. Login Again");location.href="/user/login";</script>');
    }
})

module.exports = router;