const express = require('express');
const path = require('path');

const user_login = require('../../services/user.service/login.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    const { id, pw } = req.body;

    try {
        const jwt_token = await user_login(id, pw);
 
        if (jwt_token) {
            res.cookie('jwt_token', jwt_token, { httpOnly: true });
            res.send('<script>alert("login success"); location.href="/";</script>');
        }
        else {
            res.send('<script>alert("login failed");</script>');
        }
        
    } catch (e) {
        console.log('/login error : ' + e);
        res.render(400);
    }
})

module.exports = router;