const express = require('express');
const path = require('path');
const user_register = require('../../services/user.service/register.service.js');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    var { id, pw, username, email } = req.body;

    try {
        var result = await user_register(id, pw, username, email);
    
        if (result === 'pw_and_email_not_match') {
            res.send('<script>alert("pw and email format mismatch"); location.href="/user/register"</script>');
        }
        else if (result === 'pw_not_match') {
            res.send('<script>alert("pw format mismatch"); location.href="/user/register"</script>')
        }
        else if (result === 'email_not_match') {
            res.send('<script>alert("email format mismatch"); location.href="/user/register"</script>')
        }
        else if (result === 'duplicate_id') {
            res.send('<script>alert("duplicate ID"); location.href="/user/register"</script>')
        }
        else if (result === 'duplicate_username') {
            res.send('<script>alert("duplicate USERNAME"); location.href="/user/register"</script>')
        }
        else {
            res.send('<script>alert("register success");location.href = "/"</script>');
        }

    } catch (e) {
        console.log('/register post error : ' + e);
        res.render('400');
    }

});

module.exports = router;