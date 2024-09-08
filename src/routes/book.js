import {Router} from 'express'
import book from '../controller/book.js';

const routes = Router();

routes.post('/create',book.addBook)
routes.get('/getall',book.getAllBook)
routes.get('/getBook/:bookID',book.getBookBYId)
routes.patch('/update/:bookID',book.updateBookByID)
routes.delete('/delete/:bookID', book.deleteBookByID)

export default routes