
import bookModel from '../model/bookModel.js';
import Review from './../model/reviewModel.js';
//const { isAdmin, isUser } = require('../middleware/auth'); // Middleware for authentication  

//  Add a new review  
const addReview = async (req, res) => {  
    const { userId, bookID, reviewText, rating } = req.body;  
        console.log(userId, bookID, reviewText, rating )
    try {  
        const newReview = new Review({  
            bookID,  
            userId,
            reviewText,
            rating,  
        });  

        await newReview.save();  

        // Update the book's average rating if necessary  
        const book = await bookModel.findOne({bookID});  
        book.reviews.push(newReview._id);  
        await book.save();  

        res.status(201).send({ message: 'Review added successfully!', review: newReview });  
    } catch (error) {  
        res.status(500).send({ message: 'Error adding review', error: error.message });  
    }  
};  


//get Review by ID
const getReviewById = async (req, res) => {  
    const { id } = req.params;  
    try {  
        const review = await Review.findById(id);  
        if (!review) {  
            return res.status(404).json({ message: 'Review not found' });  
        }  
        res.status(200).json(review);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching review', error: error.message });  
    }  
};  

 

//Delete a specific review (admin only)  
const deleteReview = async (req, res) => {  
    const { reviewID } = req.params;  
    console.log(reviewID)
    try {  
        const review = await Review.findById(reviewID);  
        if (!review) {  
            return res.status(404).json({ message: 'Review not found' });  
        }  

        // Check if the user is an admin or the owner of the review  
        // if (!isAdmin(req) && review.userID.toString() !== req.user.id) {  
        //     return res.status(403).json({ message: 'Not authorized to delete this review' });  
        // }  

        await Review.findByIdAndDelete(reviewID);  
        res.status(200).json({ message: 'Review deleted successfully' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error deleting review', error: error.message });  
    }  
};  

//Update a specific review (admin or user)  
const updateReview = async (req, res) => {  
    const { reviewID } = req.params;  
    const { review, rating } = req.body;  

    try {  
        const existingReview = await Review.findById(reviewID);  
        if (!existingReview) {  
            return res.status(404).json({ message: 'Review not found' });  
        }  

        // Check if the user is an admin or the owner of the review  
        // if (!isAdmin(req) && existingReview.userID.toString() !== req.user.id) {  
        //     return res.status(403).json({ message: 'Not authorized to update this review' });  
        // }  

        existingReview.review = review || existingReview.review;  
        existingReview.rating = rating || existingReview.rating;  
        await existingReview.save();  

        res.status(200).json({ message: 'Review updated successfully', review: existingReview });  
    } catch (error) {  
        res.status(500).json({ message: 'Error updating review', error: error.message });  
    }  
};

export default {
    addReview,
    getReviewById,
    updateReview,
    deleteReview
}