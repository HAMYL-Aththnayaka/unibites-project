import express from 'express'
import { viewTo,viewRemove,addTo } from '../Controller/contactControler.js';
const router = express.Router();

router.get('/view',viewTo);
router.post('/remove/:id',viewRemove);
router.post('/addto',addTo);

export default router