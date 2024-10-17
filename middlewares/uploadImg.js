const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname,'../temp'));
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null, file.fieldname+'-'+uniqueSuffix+".jpeg");

    }
});

const multerFilter = (req,file,cb)=>{
        console.log("filter");
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else{
        cb({
            message:"Unsupported file formate"
        },
        false
    )
    }
}

const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:2000000}
})

const productImgResize = async(req,res,next)=>{
        console.log("filter1");

    if(!req.file){
        return next();
    }
    await Promise.all(req.files.map(async (file)=>{
        await sharp(file.path).resize({width:300 , height:300}).toFormat('jpeg').jped({quality:90}).toFile(`temp/${file.filename}`);
        fs.unlinkSync(`temp/${file.filename}`);

    }));
    console.log("filter1");
    next();
}

module.exports ={uploadPhoto, productImgResize}
