import mongoose from "./index.js";

const bookSchema = new mongoose.Schema(
  {
    bookID:{
        type:String,
        required:[true,"BOOK ID is required"]
    },
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A book must have an author"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
    },
    publishedDate: {
      type: Date,
    },
    publisher: {
      type: String,
      trim: true,
    },
    pageCount: {
      type: Number,
      trim:true
    },
    language: {
      type: String,
      trim: true,
    }, 
    numBooksAvailable:{
      type:Number,
      trim:true
    },
    genre:{
      type:String,
      trim:true
    },
    averageRating:{
      type: Number,
      default:0
    },
    ratingsCount:{
      type:Number,
      default:0
    },
    availabilityStatus:{
      type:String,
      enum:['available','checked out','reserved','not available'],
      default:'available'
    },
    reviews: [{  
      type: String, 
      ref: 'review',  
    }],   
    reservations: [{   
      type: mongoose.Schema.Types.ObjectId,   
      ref: 'Reservation'
    }]   
  },
  {
    timestamps: true,
  }
);

const bookModel = new mongoose.model("book", bookSchema);
export default bookModel;
