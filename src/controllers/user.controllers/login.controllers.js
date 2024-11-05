const express = require('express');

const user_login = require('../../services/user.service/login.service.js');
const jwt = require('../../services/jwt.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.post('/login', (req, res) => {
    const { id, pw } = req.body;

    const login_result = user_login(id, pw);

    if (login_result) {
        const jwt_token = jwt.generate_jwt({'username':login_result[username], 'role':login_result[role]});

        if (jwt_token) {
            res.send('<script>alert("login success"); location.href="/";</script>');
            
        }
    }
    else {
        res.send('<script>alert("login failed");</script>');
    }
})