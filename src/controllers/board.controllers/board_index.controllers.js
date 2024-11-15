const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const board_index = require('../../services/board.service/board_index.service.js');
const jwt = require('../../services/jwt.service.js');

const app = express();
const router = express.Router();

app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

router.get('/', async (req, res) => {
    const logined = jwt.verify_jwt(req.cookies.jwt_token).username;

    const writes_list = await board_index.show_writes_list();

    res.render('board_index', { 'writes_list' : writes_list, 'logined' : logined });
});

module.exports = router;