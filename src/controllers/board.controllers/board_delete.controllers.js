const express = require('express');

const board_delete = require('../../services/board.service/board_delete.service.js');

const router = express.Router();
const app = express();

app.use(express.json());

router.delete('/delete', async (req, res) => {
    const { page } = req.body;
    
    await board_delete.delete_write(page);

    res.send('ok');
})

module.exports = router;