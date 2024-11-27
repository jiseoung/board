const multer = require('multer');
const path = require('path');

exports.file_setting = multer({
    storage: multer.diskStorage({
        destination (req, file, done) {
            done(null, "uploads/");
        },
        filename (req, file, done) {
            file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
            const ext = path.extname(file.originalname);

            done(null, path.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fieldSize: 5 * 1024 * 1024 },
});