import mongoose from "mongoose";
import 'dotenv/config.js';

mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`)
.then((value)=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

export default mongoose;