const express = require('express');
const path = require('path');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;