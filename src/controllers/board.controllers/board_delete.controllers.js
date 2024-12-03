const express = require('express');

const jwt = require("../../services/jwt.service.js");
const board_delete = require('../../services/board.service/board_delete.service.js');

const router = express.Router();
const app = express();

app.use(express.json());

router.delete('/delete', async (req, res) => {
    const { page } = req.body;
    const { username, role } = await jwt.verify_jwt(req.cookies.jwt_token);
    
    const result = await board_delete.delete_write(page, username, role);

    if (result === 'succeed') {
        res.status(200).send('ok');
    }
    else {
        res.status(400).send('Bad Request');
    }


})

module.exports = router;