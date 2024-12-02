const express = require('express');

const router = express.Router();

const board_index_controllers = require('../controllers/board.controllers/board_index.controllers.js');
const board_write_controllers = require('../controllers/board.controllers/board_write.controllers.js');
const board_show_controllers = require('../controllers/board.controllers/board_show.controllers.js');
const board_modify_controllers = require('../controllers/board.controllers/board_modify.controllers.js');
const board_delete_controllers = require('../controllers/board.controllers/board_delete.controllers.js');
const board_comment_controllers = require('../controllers/board.controllers/board_comment.controllers.js');

router.use('/board', board_index_controllers);
router.use('/board', board_write_controllers);
router.use('/board', board_show_controllers);
router.use('/board', board_modify_controllers);
router.use('/board', board_delete_controllers);
router.use('/board', board_comment_controllers);

module.exports = router;