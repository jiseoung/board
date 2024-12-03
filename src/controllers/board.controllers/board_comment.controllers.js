const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const jwt = require('../../services/jwt.service.js');
const board_comment = require('../../services/board.service/board_comment.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));
router.use(cookieParser());

router.post('/show/comment', async (req, res) => {
    const { page, comment, secret } = req.body;
    const username = await jwt.verify_jwt(req.cookies.jwt_token).username;

    const secret_check = await board_comment.secret_check(secret);

    await board_comment.leave_comment(page, username, comment, secret_check);

    res.send('<script>location.href="/board/show?page=' + page + '"</script>');
})

router.post('/show/reply', async (req, res) => {
    const { page, parent_index, reply, secret } = req.body;
    const username = await jwt.verify_jwt(req.cookies.jwt_token).username;

    const secret_check = await board_comment.secret_check(secret);

    try {
        await board_comment.leave_reply(page, parent_index, username, reply, secret_check);

        res.send('<script>location.href="/board/show?page=' + page + '"</script>');
    } catch (e) {
        console.log("/show/reply error : " + e);
        res.render(400);
    }
})

router.post('/show/comment/edit', async (req, res) => {
    const { page, com_index, comment_edit, secret } = req.body;
    const { username, role } = await jwt.verify_jwt(req.cookies.jwt_token);

    const secret_check = await board_comment.secret_check(secret);

    try {
        const result = await board_comment.edit_comment(username, role, com_index, comment_edit, secret_check);

        if (result === 'fail') {
            res.status(400).send('<script>alert("you cant edit"); location.href="/board/show?page=' + page + '"</script>');
        }
        else if (result === 'succeed') {
            res.status(200).send('<script>location.href="/board/show?page=' + page + '"</script>');
        }
    } catch (e) {
        console.log('/show/comment error : ' + e);
        return res.status(400).render(400);
    }
})

router.delete('/show/comment', async (req, res) => {
    const { com_index } = req.body;
    const { username, role } = await jwt.verify_jwt(req.cookies.jwt_token);

    try {
        const result = await board_comment.delete_comment(username, role, com_index);

        if(result === 'fail') {
            res.status(400).send('Bad Request');
        }
        else if (result === 'succeed') {
            res.status(200).send('ok');
        }
    } catch (e) {
        console.log('delete /show/comment error : ' + e);
        res.status(400).render(400);
    }
})

module.exports = router;