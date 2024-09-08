import mongoose from "mongoose";
import cloudinary from './../utils/cloudinaryConfig.js';
import bookModel from "../model/bookModel.js";
import { randString } from "../common/helper.js";


// add a new book

const addBook = async (req,res) => {
    try {
        const{title, author, description, image, isbn, publishedDate, publisher, pageCount, language, numBooksAvailable, genre} = req.body;
        
        console.log(req.body.image)

        const existingBook = await bookModel.findOne({ isbn });
        if (existingBook) {
            res.status(404).send({
                message:"Book with this ISBN already exists."
            })
        }


        //upload image to cloudinary
        if(image !== '/books/dummy.jpeg'){
            const result = await cloudinary.v2.uploader.upload(image,{
                folder:"books"
            })
    
            const bookData = {
                title,
                author,
                description,
                image: result.secure_url,
                isbn,
                publishedDate,
                publisher,
                pageCount,
                language,
                numBooksAvailable,
                genre,
                bookID: randString(5)
            };
    
    
            const newBook = await bookModel.create(bookData)
            console.log(newBook)
    
            res.status(201).send({
                message:"Book Created successfully!!",
                book: newBook
            })
        }
       else{
        res.status(404).send({
            message:"Provide Image URL!!",
        })
       }
       
    } catch (error) {
        res.status(500).send({
                    message:error.message || "Internal server error",
                    error
                })
       
    }
}

// get book by ID

const getBookBYId = async(req,res) => {
    try {
        const bookID = req.params.bookID;
        const book = await bookModel.findOne({bookID});

        if(!book){
            res.status(404).send({
                message:"No book found"
            })
        }
        else{
            res.status(200).send({
                data:book
            })
        }

    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
    }
}

// get all books

const getAllBook = async(req,res) => {
    try {
       const books = await bookModel.find();
       
       if(!books){
        res.status(404).send({
            message:"NO books found"
        })
        }
        else{
            res.status(200).send({
                data:books
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
    }
}

//update book by ID

const updateBookByID = async(req,res) => {
    try {
        const bookID = req.params.bookID;
        const updateData = req.body;
        const updateBook = await bookModel.findOneAndUpdate({bookID},updateData, {new:true})

        if(updateBook){
            res.status(200).send({
                message:"Book updated successfully!!",
                data:updateBook
            })
        }else{
            res.status(404).send({
                message:"No book found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
        
    }
}

// delete book by ID

const deleteBookByID = async(req,res) => {
    try {
        const bookID = req.params.bookID;
        const deleteBook = await bookModel.findOneAndDelete({bookID});
        if(deleteBook){
            res.status(200).send({
                message:"Book deleted successfully!!",
                book:deleteBook
            })
        }else{
            res.status(404).send({
                message:"No book found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
    }
}


export default {
    addBook,
    getBookBYId,
    updateBookByID,
    deleteBookByID,
    getAllBook
}