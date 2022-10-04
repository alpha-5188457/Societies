import express from 'express';

//importing user methods defined for directing router (express) functions like post get patch delete -- CRUD operations
import { getPosts , createPost, updatePost, deletePost, likePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';
//, createPost 

//express router object created
const router = express.Router();

//CRUD operations provided by express.
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth,  updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

//server-side index.js is importing this router (express) object
export default router;