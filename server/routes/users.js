import express from 'express';

//importing user methods defined for directing router (express) functions like post get patch delete -- CRUD operations
import {signin, signup } from '../controllers/user.js';
//, getPost, createPost 

//express router object created
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);


export default router;