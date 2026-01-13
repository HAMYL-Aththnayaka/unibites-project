<<<<<<< HEAD
//admin food backend eka
=======
//admin food backend

>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
import express from 'express'
import {addFood, listFood, removeFood} from '../Controller/foodControler.js'
import multer from 'multer'

const router = express.Router();

//image storager
 const storage =multer.diskStorage({
    destination:'src/uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} - ${file.originalname}`)
    }
 })
const upload = multer({storage:storage})
router.post('/add',upload.single('image'),addFood)
router.get('/list',listFood);
router.delete('/remove',removeFood)

export default router;