const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const board_show = require('../../services/board.service/board_show.service.js');
const jwt = require('../../services/jwt.service.js');
const manage_view = require('../../middlewares/board_manage_view.middleware.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

router.get('/show', async (req, res) => {
    const { page } = req.query;
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    const is_viewed = await manage_view.viewed_before(page, username);

    if (!is_viewed) {
        await manage_view.increase_view(page, username);
    }

    try {
        const show_write_result = await board_show.show_write(page);

        if (show_write_result) {
            res.render('board_show', { 'write' : show_write_result });
        }
    } catch (e) {
        console.log('/show error' + e);
    }
});

router.post('/show/download', (req, res) => {
    const { file_name } = req.body;

    const download_path = path.join(__dirname, '../../../uploads/' + file_name);

    res.download(download_path);
})

module.exports = router;