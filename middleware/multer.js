const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        cb(null, (new Date().toISOString()+file.originalname).replace(/%20/g, '-'));
    }
});
const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        req.fileValidationError = 'Unsupported image type';
        cb(null, false)
    }
}
const upload = multer({storage: storage, fileFilter:fileFilter});

module.exports = upload