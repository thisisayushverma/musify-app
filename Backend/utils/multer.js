import multer from "multer";
import { v4 as uuid } from "uuid";


const diskStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploaded")
    },
    filename:function(req,file,cb){
        const fileUuid = uuid();
        cb(null,fileUuid)
    }
})

const upload = multer({
    storage:diskStorage
})


export {
    upload
}