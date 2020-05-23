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
    if (file.mimetype === 'image/jpeq' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error("unsupported image type"), false)
    }
}
const upload = multer({storage: storage, fileFilter:fileFilter});

module.exports = upload