import express from 'express'
import {addFood} from '../Controller/foodControler.js'
import multer from 'multer'

const router = express.Router();

//image storager
 const sotrage =multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
 })
const upload = multer({storage:storage})
router.post('/add',upload.single('image'),addFood)

export default router;