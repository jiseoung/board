const express = require('express');
const path = require('path');
const fs = require('fs');

const board_show = require('../../services/board.service/board_show.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/show', async (req, res) => {
    const { page } = req.query;

    try {
        const show_write_result = await board_show.show_write(page);

        if (show_write_result) {
            res.render('board_show', { 'write' : show_write_result });
        }
    } catch (e) {
        console.log('/show error' + e);
    }
});

module.exports = router;