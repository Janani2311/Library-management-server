import {Router} from 'express'
import Review from './../controller/review.js'

const routes = Router();

routes.post('/add',Review.addReview)
routes.get('/get/:id', Review.getReviewById);
routes.patch('/update/:reviewID', Review.updateReview)
routes.delete('/delete/:reviewID',Review.deleteReview)
// routes.get('/getall',book.getAllBook)
// routes.get('/getBook/:bookID',book.getBookBYId)
// routes.patch('/update/:bookID',book.updateBookByID)
// routes.delete('/delete/:bookID', book.deleteBookByID)

// POST /api/reviews: Add a new review.
// GET /api/books/:bookID/reviews: Get all reviews for a specific book.
// DELETE /api/reviews/:reviewID: Delete a specific review (admin only).
// PUT /api/reviews/:reviewID: Update a specific review (admin or user).

export default routes