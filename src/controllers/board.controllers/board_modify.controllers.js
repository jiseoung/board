const express = require('express');
const path = require('path');

const jwt = require('../../services/jwt.service.js');
const board_modify = require('../../services/board.service/board_modify.service.js');
const board_file = require('../../services/board.service/board_file.service.js');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));

const upload = board_file.file_setting;

router.get('/modify', async (req, res) => {
    const { page } = req.query;
    const { username, role } = await jwt.verify_jwt(req.cookies.jwt_token);

    const write = await board_modify.get_write(page);

    if (write[0].username === username || role === 1) {
        res.render('board_modify', { 'write' : write });
    }
    else {
        res.status(400).send('Bad Request');
    }
})

router.post('/modify', upload.single('file'), async (req, res) => {
    const { page } = req.query;
    const { title, content, secret } = req.body;
    const { username, role } = await jwt.verify_jwt(req.cookies.jwt_token);

    const file_name = await board_modify.file_check(req.file);
    const secret_check = await board_modify.secret_check(secret);
    
    try {
        const result = await board_modify.modify(username, role, page, title, content, file_name, secret_check);

        if (result === 'succeed') {
            res.status(200).send('<script>alert("modify complete"); location.href="/board/show?page='+page+'"</script>');
        }
        else if (result === 'fail') {
            res.status(400).send('<script>alert("you cant modify"); location.href="/board/show?page='+page+'"</script>');
        }

    } catch (e) {
        console.log('/modify post error : ' + e);
        res.render(400);
    }
})

module.exports = router;