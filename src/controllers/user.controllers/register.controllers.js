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

router.post('/register', (req, res) => {
    var { id, pw, username, email } = req.body;

    var result = user_register(id, pw, username, email);
    if (result) {
        res.send('<script>alert("register success");location.href = "/"</script>');
    }
    else {
        res.send('<script>alert("register failed");</script>');
    }
});

module.exports = router;