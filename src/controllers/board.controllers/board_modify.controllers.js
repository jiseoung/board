const express = require('express');
const path = require('path');

const board_modify = require('../../services/board.service/board_modify.service.js');
const board_file = require('../../services/board.service/board_file.service.js');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));

const upload = board_file.file_setting;

router.get('/modify', async (req, res) => {
    const { page } = req.query;

    const write = await board_modify.get_write(page);

    res.render('board_modify', { 'write' : write });
})

router.post('/modify', upload.single('file'), async (req, res) => {
    const { page } = req.query;
    const { title, content, secret } = req.body;

    const file_name = await board_modify.file_check(req.file);
    const secret_check = await board_modify.secret_check(secret);
    
    try {
        await board_modify.modify(page, title, content, file_name, secret_check);

        res.send('<script>alert("modify complete"); location.href="/board/show?page='+page+'"</script>');
    } catch (e) {
        console.log('/modify post error : ' + e);
    }
})

module.exports = router;