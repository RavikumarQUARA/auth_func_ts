import  express from 'express'
import { createUser,updateUser ,deleteUser,getUser,login, logout} from '../controllers/userControllers' 
import auth from '../middleware/auth'


const routes = express.Router()
routes.post('/login', login)

routes.post("/singup", createUser);

routes.get("/logout",auth, logout);


routes.get('/gets', auth,getUser)
routes.put("/update",auth, updateUser);
routes.delete("/delete/:id",auth, deleteUser);



export default routes;
