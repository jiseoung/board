const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('../../services/jwt.service.js');
const board_index = require('../../services/board.service/board_pagination.service.js');

const app = express();
const router = express.Router();

app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

router.get('/', async (req, res) => {
    const { page_index } = req.query;
    const user = await jwt.verify_jwt(req.cookies.jwt_token);
    const { total_page, writes_list } = await board_index.pagination(Number(page_index));

    res.render('board_index', { 'total_page' : total_page, 'page_index' : page_index, 'writes_list' : writes_list, 'user' : user });
});

module.exports = router;