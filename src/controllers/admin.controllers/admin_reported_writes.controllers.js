const express = require('express');
const path = require('path');

const check_admin = require('../../middlewares/check_admin.middleware.js');
const reported_writes = require('../../services/admin.service/reported_writes.service.js');

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname + '/public/views'));

router.get('/reported_writes', check_admin, async (req, res) => {
    const reported_writes_list = await reported_writes.list();

    res.render('admin_reported_writes', { 'reported_writes_list' : reported_writes_list });
})

module.exports = router;