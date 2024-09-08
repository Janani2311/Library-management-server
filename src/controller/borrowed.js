import Book from "../model/bookModel.js";
import Borrowing from "../model/borrowed.js";
import Reservation from "../model/reservation.js";
import User from "../model/userModel.js";
import { sendNotification } from "./mailService.js";


 const borrowBook = async (req, res) => {  
    const { bookID, userId } = req.body;  
  
    try {  
      const book = await Book.findOne({bookID});  
  
      if (!book) {  
        return res.status(404).json({ message: 'Book not found' });  
      }  
  
      if (book.availabilityStatus === 'available') {  
        book.availabilityStatus = 'checked out';  
        await book.save();  
  
        const dueDate = new Date();  
        dueDate.setDate(dueDate.getDate() + 14); // Assuming a 14-day borrowing period  
  
        const newBorrowing = new Borrowing({ bookID, userId, dueDate });  
        await newBorrowing.save();  
  
        res.status(201).json({ message: 'Book borrowed successfully', data:newBorrowing });  
      } else {  
        res.status(400).json({ message: 'Book is currently checked out' });  
      }  
    } catch (error) {  
      res.status(500).json({ message: 'Error borrowing book', error: error.message });  
    }  
  };  
  
const getBorrowedBookByUserID = async(req,res) => {
    const {userId} = req.params;

    try {
      const borrowedBooks = await Borrowing.find({userId});

      if(!borrowedBooks){
        return res.status(404).json({ message: 'No books borrowed Yet!!'});  
      }
      else{
        return res.status(200).json({ books: borrowedBooks});  
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching borrowed book', error: error.message });  
    }
}

const getAllBorrowedBooks = async(req,res) => {
      try{
      const borrowedBooks = await Borrowing.find();
  
      if (!borrowedBooks) {
          res.status(404).send({
              message:'No borrowed books found.'
          })
      }else{
      res.status(200).send({
          data:borrowedBooks
      });
      }
  }
  catch(error){
      res.status(500).send({
          message:error.message || "Internal server error",
          error
      })
  }
}

const returnBook = async (req, res) => {  
    const { bookID, userId, finePaid } = req.body;  
     
  
    try {  
      const borrowing = await Borrowing.findOne({ bookID, userId, returnDate: null });  
  
      if (!borrowing) {  
        return res.status(404).json({ message: 'No active borrowing found' });  
      }  
  
       
        
      
      // Calculate late fee if applicable
      const today = new Date();  
      if (borrowing.dueDate < today) {  
        const daysLate = Math.ceil((today - borrowing.dueDate) / (1000 * 60 * 60 * 24));  
        borrowing.lateFee = daysLate * 1; // Assuming $1 per day late  
      }else{
        borrowing.lateFee = 0;
      }  

       // Check if fine is applicable and if it has been paid  
       if (borrowing.lateFee > 0 && !finePaid) {  
        return res.status(400).json({ message: 'Please pay the late fee before returning the book.' });  
    } 
      
      borrowing.returnDate = new Date(); 
      await borrowing.save();  
  
      const book = await Book.findOne({bookID});  
      book.availabilityStatus = 'available';  
      await book.save();  

        // Notify users who reserved the book  
        const reservations = await Reservation.find({ bookID, status: 'active' });  
        for (const reservation of reservations) {  
            const userEmail = reservation.userId; // Assuming userId is the email  
            await sendNotification(userEmail, book.title);  
        }
      
      await Borrowing.deleteOne({ _id: borrowing._id });  

      res.status(200).json({ message: 'Book returned successfully', lateFee: borrowing.lateFee });  
    } catch (error) {  
      res.status(500).json({ message: 'Error returning book', error: error.message });  
    }  
  };

  const notifyOverdueBooks = async (req,res) => {  
    try {  
        const today = new Date();  
        
        const overdueBorrowings = await Borrowing.find({   
            returnDate: null,  
            dueDate: { $lt: today }  
        });  

        // Send notifications to users with overdue books  
        for (const borrowing of overdueBorrowings) {  
           
            const user = await User.findOne({ userId: borrowing.userId });  
            if (user) {   
                const book = await Book.findOne({ bookID: borrowing.bookID }); 
                if (book) {  
                    const userEmail = user.email;  
                    const bookTitle = book.title; 
                    await sendNotification(userEmail, bookTitle);  
                } else {  
                    console.error(`Book not found for borrowing ID: ${borrowing._id}`);  
                }  
            } else {  
                console.error(`User not found for borrowing ID: ${borrowing._id}`);  
            }  
        }  
        res.status(200).json({ message: `Notifications sent for ${overdueBorrowings.length} overdue books.` });  
        
    } catch (error) {  
      res.status(500).json({ message: 'Error notifying overdue books:', error}); 
    }  
};  

export default {
    borrowBook,
    returnBook,
    getAllBorrowedBooks,
    getBorrowedBookByUserID,
    notifyOverdueBooks
}
