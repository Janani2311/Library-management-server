import {Router} from 'express'
import borrowed from '../controller/borrowed.js';

const routes = Router();

routes.post('/add',borrowed.borrowBook)
routes.get('/book/:userId',borrowed.getBorrowedBookByUserID)
routes.get('/books',borrowed.getAllBorrowedBooks)
routes.post('/return',borrowed.returnBook)
routes.post('/overdue',borrowed.notifyOverdueBooks)
// routes.get('/getall',borrowed.getAllBorrowedBooks)
// routes.put('/update/:bookID',borrowed.updateBorrowedBookById)
// routes.delete('/delete/:bookID', borrowed.deleteBorrowedBookById)

export default routes