const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const router = express.Router();
const app = express();

app.use(cookieParser());
app.set('views', path.join(__dirname + '/../../../public/views'));
app.set('view engine', 'ejs');

router.get('/', (req, res) => {
    res.render('admin_index');
})

module.exports = router;