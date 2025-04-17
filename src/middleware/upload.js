const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
      },
    filename: function (req, file, cb) {
        const currentTime = Date.now();
        req.body.currentTime = currentTime;
        cb(null, currentTime + '_' + file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('profile_image');

module.exports = { uploadImg };
