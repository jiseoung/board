const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const board_show = require('../../services/board.service/board_show.service.js');
const jwt = require('../../services/jwt.service.js');
const manage_view = require('../../middlewares/board_manage_view.middleware.js');
const Good_Bad = require('../../services/board.service/board_good_bad.service.js');
const board_report = require('../../services/board.service/board_report.service.js');

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

    const good_and_bad = new Good_Bad(page, username);
    const check_good_and_bad = await good_and_bad.click_check();

    try {
        const show_write_result = await board_show.show_write(page);

        if (show_write_result) {
            res.render('board_show', { 'write' : show_write_result, 'good_and_bad' : check_good_and_bad });
        }
    } catch (e) {
        console.log('/show error' + e);
    }
});

router.post('/show', async (req, res) => {
    const { page } = req.body;

    try {
        await board_report.report(page);

        res.send('ok');
    } catch (e) {
        console.log('post /show error : '+ e);
    }
    
})

router.put('/show/good_bad', async (req, res) => {
    const { page, click } = req.body;
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    try {
        const good_and_bad = new Good_Bad(page, username);

        await good_and_bad.click_reflection(click);
    } catch (e) {
        console.log('/show/good_bad error : ' + e);
    }

    res.send("ok");
})

router.post('/show/download', (req, res) => {
    const { file_name } = req.body;

    const download_path = path.join(__dirname, '../../../uploads/' + file_name);

    res.download(download_path);
})

module.exports = router;