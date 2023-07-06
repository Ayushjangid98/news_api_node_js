const multer = require('multer');
const path = require('path');


var storage = multer.diskStorage({
    destination:function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null,path.join(__dirname, '../category_images/'));
        }
    },
    filename: function (req, file, cb) {
     const name = Date.now() + '-' + file.originalname;
         file.filename = name;
         cb(null, name); }
})
module.exports.singleUpload = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
         }
    },
})
