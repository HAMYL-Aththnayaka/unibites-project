import express from 'express'
import { loginUser,registerUser } from '../Controller/userControlller'

const router=express.Router()

router.post('/register',regiseterUser);
router.post('./login',loginUser);