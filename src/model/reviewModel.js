import mongoose from "./index.js";  

const reviewSchema = new mongoose.Schema(  
  {  
    bookID: {  
      type:String, 
      required: [true, "Book ID is required"],  
    },  
    userId: {  
      type:String,
      required: [true, "User ID is required"],  
    },  
    rating: {  
      type: Number,  
      required: [true, "Rating is required"],  
      min: 1,  
      max: 5,  
    },  
    reviewText: {  
      type: String,  
      required: [true, "Review text is required"],  
      trim: true,  
    },  
    createdAt: {  
      type: Date,  
      default: Date.now,  
    },  
    updatedAt: {  
      type: Date,  
      default: Date.now,  
    },  
  },  
  {  
    timestamps: true,  
  }  
);  


const reviewModel = new mongoose.model("review", reviewSchema);  
export default reviewModel;