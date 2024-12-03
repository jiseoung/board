const express = require('express');

const router = express.Router();

const register_controllers = require('../controllers/user.controllers/register.controllers.js');
const login_controllers = require('../controllers/user.controllers/login.controllers.js');
const logout_controllers = require('../controllers/user.controllers/logout.controllers.js');
const info_controllers = require('../controllers/user.controllers/info.controllers.js');
const change_info_controllers = require('../controllers/user.controllers/change_info.controllers.js');
const change_pw_controllers = require('../controllers/user.controllers/change_pw.controllers.js');
const reset_pw_controllers = require('../controllers/user.controllers/reset_pw.controllers.js');

const auth = require('../middlewares/auth.middleware.js');

router.use('/user', register_controllers);
router.use('/user', login_controllers);
router.use('/user', reset_pw_controllers);
router.use('/user', auth, logout_controllers);
router.use('/user', auth, info_controllers);
router.use('/user', auth, change_info_controllers);
router.use('/user', auth, change_pw_controllers);

module.exports = router;