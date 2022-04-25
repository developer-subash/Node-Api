const multer = require('multer');
const path = require('path');

//multer config

const upload = multer({
    // storage: multer.diskStorage({}),
    // fileFilter: (req:any, file: any, cb: any) => {
    //     let ext = path.extname(file.originalname);
    //     if (ext != ".jpg" && ext != ".jpeg" && ext != ".png") {
    //         cb(new Error('File type Not Supported'), false);
    //         return;
    //     }
    //     cb(null, true);

    // },
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
})

module.exports = upload;