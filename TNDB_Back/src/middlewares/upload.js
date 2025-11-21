import multer from 'multer';

const MulterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/tmp')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname.split('.')[0]}.${file.mimetype.split('/')[1]}`)
    }
});

export const MulterUpload = multer({ storage: MulterStorage, limits: { fieldSize: 25 * 1024 * 1024 } }).fields([
    {
        name: 'coverPicture',
        maxCount: 1,
        type: 'file'
    },
    {
        name: 'profilePicture',
        maxCount: 1,
        type: 'file'
    }
]);