# Library Management System Server  

The "Library Management System" web service is built using the MERN (MongoDB, Express.js, React, Node.js) stack, providing functionalities for managing library resources, including book tracking, member management, and circulation services, along with user authentication for secure access.  

**Library Management System API documentation** - https://documenter.getpostman.com/view/36929104/2sAXqmCkte

## Overview  
This project aims to facilitate efficient management of library operations by allowing users to manage books, view available resources, check out items, return them, and leave reviews. Additionally, it secures user data through hashed passwords using bcrypt and employs JWT for user authentication to retrieve account details securely from the database.  

## LIBRARY MANAGEMENT SYSTEM ENDPOINTS  

### Books  
1. **/books/add**  
   - To add a new book to the library inventory.  
   
2. **/books/:id**  
   - To retrieve details of a specific book by its ID.  
   
3. **/books/update/:id**  
   - To update the details of a specific book by its ID.  
   
4. **/books/delete/:id**  
   - To delete a book from the inventory by its ID.  
   
5. **/books/available**  
   - To get a list of all available books in the library.  

### Users  
1. **/users/signup**  
   - Allows users to create a new account by providing necessary details such as name, email, and password.  
   
2. **/users/signin**  
   - Checks the existence of the user's email and password.  
   - Passwords are hashed and stored securely in the database using bcrypt.  
   - Upon successful sign-in, an authenticated token (JWT) is returned for session management.  
   
3. **/users/resetpwd**  
   - Allows users to reset their password securely after verification.  
   
4. **/users/getUserByID**  
   - Retrieves user details for the authenticated user based on the submitted JWT token.  

### Borrowing  
1. **/borrow/book/:bookId**  
   - Allows a user to borrow a book by its ID. The system updates the book's status and registers the user as the borrower.  
   
2. **/borrow/mybooks**  
   - Retrieves a list of books currently borrowed by the authenticated user.  

### Returns  
1. **/return/book/:bookId**  
   - Allows a user to return a borrowed book by its ID. The system updates the book's status and removes the user as the borrower.  

### Reviews  
1. **/reviews/add**  
   - Allows a user to add a review for a specific book by providing the book ID and the review content.  
   
2. **/reviews/:bookId**  
   - Retrieves all reviews for a specific book by its ID.  
   
3. **/reviews/update/:reviewId**  
   - Allows a user to update their existing review by providing the review ID.  

## Technology Used:  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Additional Libraries/Tools**: Bcrypt, JWT , cloudinary, nodemailer

This README provides a comprehensive overview of the Library Management System server, highlighting its key functionalities and technical aspects, ensuring ease of understanding and quick reference for developers and users alike.
