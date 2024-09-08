import {Router} from 'express'
import reserve from '../controller/reservation.js'

const routes = Router();

routes.post('/add',reserve.reserveBook)
routes.get('/get/:userId',reserve.reservedBookByUserID)


export default routes