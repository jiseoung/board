const multer = require('multer');
const path = require('path');

const file_filter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
  
    if (!allowed.includes(file.mimetype)) {
        const error = new Error("Only photo files can be uploaded");
        error.code = "INCORRECT_FILETYPE";
        return cb("Only photo files can be uploaded", false); 
    }
  
    cb(null, true);
};

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
    fileFilter: file_filter,
    limits: { fieldSize: 5 * 1024 * 1024 }
});