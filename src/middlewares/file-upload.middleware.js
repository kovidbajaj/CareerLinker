import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/pdfs");
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+"-"+file.originalname;
        cb(null,name);
    }
})

export const uploadFile=multer({storage});