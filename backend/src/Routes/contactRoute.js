import express from 'express'
import { viewTo,viewRemove,addTo } from '../Controller/contactControler.js';
const router = express.Router();

router.post('/view',viewTo);
router.post('/remove',viewRemove);
router.post('/addto',addTo);

export default router