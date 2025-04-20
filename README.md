# Book Store API

A RESTful API for managing a bookstore, including book browsing, user authentication, and a review system. All data is persisted in JSON files.

## Features

- **Book Management**:
  - Browse books with pagination
  - Search books by ISBN, author, or title
  - Get detailed information about specific books
- **User System**:
  - User registration
  - User authentication with JWT
  - Session management
- **Review System**:

  - Post reviews for books
  - Update existing reviews
  - Delete reviews
  - View all reviews for a specific book

- **Data Persistence**:
  - All data (books, users, reviews) persisted in JSON files
  - Data remains available after server restart

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens), Express Session
- **Documentation**: Swagger UI
- **Data Storage**: JSON files

## Installation

1. Clone the repository:
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Or run in production mode:
   `npm run start`

5. The server will be running at [http://localhost:3000](http://localhost:3000)

## API Documentation

This project uses Swagger for API documentation. After starting the server, visit:
[http://localhost:3000/docs](http://localhost:3000/docs)

### API Endpoints

#### Books

- `GET /api/books` - Get paginated list of books
- `GET /api/books/ISBN/:ISBN` - Get book by ISBN
- `GET /api/books/author/:author` - Get books by author
- `GET /api/books/title/:title` - Get books by exact title
- `GET /api/books/ISBN?ISBN=value` - Search books by ISBN
- `GET /api/books/author?author=value` - Search books by author
- `GET /api/books/title?title=value` - Search books by title

#### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

#### Reviews (protected routes, require authentication)

- `GET /api/reviews/:bookId` - Get all reviews for a book
- `POST /api/reviews/:bookId` - Add a review for a book
- `PUT /api/reviews/:bookId` - Update an existing review
- `DELETE /api/reviews/:bookId` - Delete a review
