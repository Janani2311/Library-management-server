// models/Reservation.js  
import mongoose from "./index.js";  

const reservationSchema = new mongoose.Schema({  
  bookID: {  
    type:String,
    required: true,  
  },  
  userId: {  
    type:String, 
    required: true,  
  },  
  reservationDate: {  
    type: Date,  
    default: Date.now,  
  },  
  expirationDate: {  
    type: Date,  
    required: true,  
  },  
  status: {  
    type: String,  
    enum: ['active', 'completed', 'canceled'],  
    default: 'active',  
  },  
});  

const Reservation = mongoose.model('Reservation', reservationSchema);  
export default Reservation;