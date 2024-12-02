const express = require('express');

const router = express.Router();

const admin_index_controllers = require('../controllers/admin.controllers/admin_index.controllers.js');
const admin_manage_users_controllers = require('../controllers/admin.controllers/admin_manage_users.controllers.js');
const admin_reported_writes_controllers = require('../controllers/admin.controllers/admin_reported_writes.controllers.js');

const auth = require('../middlewares/auth.middleware.js');
const check_admin = require('../middlewares/check_admin.middleware.js');

router.use('/admin', auth, check_admin, admin_index_controllers);
router.use('/admin', auth, check_admin, admin_manage_users_controllers);
router.use('/admin', auth, check_admin, admin_reported_writes_controllers);

module.exports = router;