const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('../services/jwt.service.js');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

router.get('/', (req, res) => {
    const jwt_token = req.cookies.jwt_token;

    if (!jwt_token) {
        res.render('index', { 'username' : null });
    }
    else {
        const data = jwt.verify_jwt(jwt_token);

        res.render('index', { 'username' : data.username , 'role' : data.role });
    }
})

module.exports = router;