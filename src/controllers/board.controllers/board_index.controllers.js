const express = require('express');
const path = require('path');

const board_index = require('../../services/board.service/board_index.service.js');

const app = express();
const router = express.Router();

app.set('views', path.join(__dirname + '/public/views'));

router.get('/', async (req, res) => {
    const writes_list = await board_index.show_writes_list();

    res.render('board_index', { 'writes_list' : writes_list, 'index' : 0 });
});

module.exports = router;