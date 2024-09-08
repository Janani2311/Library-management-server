import {Router} from 'express'
import user from './../controller/user.js'
import verify from './../middleware/Verify.js'
import verifyAdmin from '../middleware/VerifyAdmin.js';
const routes = Router();

routes.post("/signup",user.signupController)
routes.post("/signin",user.signInController)
routes.post("/forgotpwd",user.forgotPassword)
routes.post("/resetpwd",user.resetPassword)
routes.get("/get",user.getUsers)
routes.get("/getuser/:id",verify,verifyAdmin,user.getUserByID)
routes.put('/changestatus',user.changeStatus)
routes.post('/activate',user.activateNewAccount)
routes.patch('/update/:userId',user.updateDetails)


export default routes