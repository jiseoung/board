const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

app.set('views', path.join(__dirname + '/public/views'));

router.get('/', (req, res) => {
    res.render('board');
});

module.exports = router;
