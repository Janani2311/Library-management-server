import {Router} from 'express';
import bookRoutes from './book.js'
import borrowedRoutes from './borrowedBook.js'
import userRoutes from './user.js'
import reviewRoutes from './review.js'
import reserveRoutes from './reservation.js'


const routes = Router();

routes.get('/',(req,res) => {
    res.send(`<h1>Welcome to Library Management System Server</h1>`)
})

routes.use('/book',bookRoutes);
routes.use('/borrow',borrowedRoutes);
routes.use('/user',userRoutes);
routes.use('/review',reviewRoutes);
routes.use('/reserve',reserveRoutes);


export default routes