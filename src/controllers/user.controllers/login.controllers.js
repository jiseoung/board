const express = require('express');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname + '/public/views'));

router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.post('/login', (req, res) => {
    const { id, pw } = req.body;

    if (result) {
        res.send('<script>alert("login success"); location.href="/";</script>');
    }
    else {
        res.send('<script>alert("login failed");</script>');
    }
})