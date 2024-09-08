import mongoose from './index.js';


const borrowedSchema = new mongoose.Schema({
    bookID: {  
        type:String, 
        required: [true, "Book ID is required"],  
    },  
    userId: {  
        type:String,
        required: [true, "User ID is required"],  
    },  
    borrowedDate: {
        type: Date,
        default: Date.now,
    },
    returnDate:{
        type:Date,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    lateFee:{
        type:Number,
        default:0
    }
}, { timestamps: true });

const Borrowed = mongoose.model('Borrowed', borrowedSchema);

export default Borrowed;