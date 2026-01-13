<<<<<<< HEAD
//helping hand backend eka
=======
//helping hand backend
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
import express from 'express'
import {addFood, listFood, removeFood,listFoodFrontEnd} from '../Controller/helpingHandFoodController.js'
import multer from 'multer'
import authMiddleware from '../Middleware/auth.js';
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
router.get('/listfront',authMiddleware,listFoodFrontEnd);
router.delete('/remove',removeFood)

export default router;