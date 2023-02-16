import  express from 'express'
import { createPost,getPostsWithUser} from '../controllers/postControllers' 

const routes = express.Router()
routes.post("/create", createPost);
routes.get("/get", getPostsWithUser);

export default routes;

