const express = require('express');

const router = express.Router();

const admin_index_controllers = require('../controllers/admin.controllers/admin_index.controllers.js');
const admin_manage_users_controllers = require('../controllers/admin.controllers/admin_manage_users.controllers.js');
const admin_reported_writes_controllers = require('../controllers/admin.controllers/admin_reported_writes.controllers.js');

router.use('/admin', admin_index_controllers);
router.use('/admin', admin_manage_users_controllers);
router.use('/admin', admin_reported_writes_controllers);

module.exports = router;