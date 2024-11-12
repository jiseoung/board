const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const jwt = require('../../services/jwt.service.js');
const board_write = require('../../services/board.service/board_write.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

const upload = board_write.file_setting;

router.get('/write', async (req, res) => {
    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    res.render('board_write', { 'username' : username });
});

router.post('/write', upload.single('file'), async (req, res) => {
    const { title, content, secret } = req.body;

    const jwt_token = req.cookies.jwt_token;
    const username = await jwt.verify_jwt(jwt_token).username;

    const file_name = req.file.originalname;
    const secret_check = await board_write.secret_check(secret);

    try {
        const write = await board_write.write(username, title, content, file_name, secret_check);

        if (write) {
            res.send('<script>alert("write complete"); location.href = "/board/";</script>');
        }
    } catch (e) {
        console.log('/write error : ' + e);
    }
    
});

module.exports = router;