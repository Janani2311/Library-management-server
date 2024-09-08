import Book from "../model/bookModel.js";  
import Reservation from "../model/reservation.js";  
import { sendNotification } from "./mailService.js";

const reserveBook = async (req, res) => {  
  const { bookID, userId } = req.body;  

  try {  
    const book = await Book.findOne({ bookID });  

    if (!book) {  
      return res.status(404).json({ message: 'Book not found' });  
    }  

    const existingReservation = await Reservation.findOne({ bookID, status: 'active' });  
    if (existingReservation) {  
      return res.status(400).json({ message: 'Book is already reserved' });  
    }  

    if (book.availabilityStatus !== 'available') {  
 
      const expirationDate = new Date();  
      expirationDate.setDate(expirationDate.getDate() + 7); 

      // Create a new reservation  
      const reservation = new Reservation({  
        bookID,  
        userId,  
        expirationDate, 
      });   

      
      await reservation.save();  

      
      book.reservations.push(reservation._id); 
      book.availabilityStatus = 'reserved';  
      await book.save();  

      return res.status(200).json({ message: 'Book reserved successfully', reservation });  
    } else {  
      return res.status(400).json({ message: 'Book is available for borrowing, not reserving' });  
    }  
  } catch (error) {  
    res.status(500).json({ message: 'Error reserving book', error: error.message });  
  }  
};


const returnBook = async (req, res) => {  
  const { bookID } = req.body;  

  try {  
    const book = await Book.findOne({ bookID });  

    if (!book) {  
      return res.status(404).json({ message: 'Book not found' });  
    }  

    // Update the book's availability status  
    book.availabilityStatus = 'available';  
    await book.save();  

    // Find all reservations for this book  
    const reservations = await Reservation.find({ bookID, status: 'active' });  

    // Notify users who reserved the book  
    for (const reservation of reservations) {  
      const userEmail = reservation.userId;
      await sendNotification(userEmail, book.title);  
    }  

    return res.status(200).json({ message: 'Book returned and users notified' });  
  } catch (error) {  
    res.status(500).json({ message: 'Error returning book', error: error.message });  
  }  
};  

const reservedBookByUserID = async(req,res) => {
  const {userId} = req.params;

  try {
    const reservedBooks = await Reservation.find({userId});

    if(!reservedBooks){
      return res.status(404).json({ message: 'No books reserved Yet!!'});  
    }
    else{
      return res.status(200).json({ books: reservedBooks});  
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reserved book', error: error.message });  
  }
}

export default{
  reserveBook,
  returnBook,
  reservedBookByUserID
}