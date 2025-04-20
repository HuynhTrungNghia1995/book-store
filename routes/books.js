const express = require("express");
const {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  searchBooksByISBN,
  searchBooksByAuthor,
  searchBooksByTitle,
  getBooksReviews,
} = require("../services");

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/", getAllBooks);

/**
 * @swagger
 * /api/books/ISBN/{ISBN}:
 *   get:
 *     summary: Retrieve a single book by ISBN
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Book by ISBN
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/ISBN/:ISBN", getBookByISBN);

/**
 * @swagger
 * /api/books/author/{author}:
 *   get:
 *     summary: Retrieve list books of author
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List books of author
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/author/:author", getBooksByAuthor);

/**
 * @swagger
 * /api/books/title/{title}:
 *   get:
 *     summary: Retrieve list books of title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List books of title
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/title/:title", getBooksByTitle);

/**
 * @swagger
 *   /api/books/reviews/{bookId}:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   bookId:
 *                     type: string
 *                   review:
 *                     type: string
 *                   userName:
 *                     type: string
 */
router.get("/reviews/:bookId", getBooksReviews);

/**
 * @swagger
 * /api/books/ISBN:
 *   get:
 *     summary: Retrieve search book by ISBN
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: ISBN
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List Books by ISBN
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/ISBN", searchBooksByISBN);

/**
 * @swagger
 * /api/books/author:
 *   get:
 *     summary: Retrieve search book by author
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List Books by author
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/author", searchBooksByAuthor);

/**
 * @swagger
 * /api/books/title:
 *   get:
 *     summary: Retrieve search book by title
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List Books by title
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: The Pragmatic Programmer
 *                   ISBN:
 *                     type: string
 *                     example: 978-0201616224
 *                   author:
 *                     type: string
 *                     example: Andrew Hunt & David Thomas
 */
router.get("/title", searchBooksByTitle);

module.exports = router;
