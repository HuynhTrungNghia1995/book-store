const data = require("../constants/data");
const books = data.books;

const getAllBooks = (req, res) => {
  const { page, pageSize } = req.query;
  const pageInt = parseInt(page);
  const pageSizeInt = parseInt(pageSize);

  const startIndex = (pageInt - 1) * pageSizeInt;
  const endIndex = startIndex + pageSizeInt;

  const paginatedBooks = books.slice(startIndex, endIndex);
  res.send({
    code: 200,
    status: "success",
    data: {
      items: paginatedBooks,
      totalCount: books.length,
    },
  });
};

const getBookByISBN = (req, res) => {
  const { ISBN } = req.params;

  const book = books.find((book) => book.ISBN === ISBN);

  res.send({
    code: 200,
    status: "success",
    data: book || null,
  });
};

const getBooksByAuthor = (req, res) => {
  const { author } = req.params;
  const books = data.books;
  const booksByAuthor = books.filter((book) => book.author === author);

  res.send({
    code: 200,
    status: "success",
    data: booksByAuthor,
  });
};

const getBooksByTitle = (req, res) => {
  const { title } = req.params;
  const booksByTitle = books.filter((book) => book.title === title);

  res.send({
    code: 200,
    status: "success",
    data: booksByTitle,
  });
};

function searchByISBNAsync(ISBN) {
  return new Promise((resolve, reject) => {
    const result = books.filter((book) =>
      book.ISBN.toLowerCase().includes(ISBN.toLowerCase())
    );

    if (result.length > 0) {
      resolve(result);
    } else {
      reject(new Error("No book found with that ISBN."));
    }
  });
}

const searchBooksByAuthor = async (req, res) => {
  const { author } = req.query;
  const booksByTitle = books.filter((book) =>
    book.author.toLowerCase().includes(author.toLowerCase())
  );

  res.send({
    code: 200,
    status: "success",
    data: booksByTitle,
  });
};

const searchBooksByTitle = async (req, res) => {
  const { title } = req.query;
  const booksByTitle = books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  res.send({
    code: 200,
    status: "success",
    data: booksByTitle,
  });
};

const searchBooksByISBN = async (req, res) => {
  const { ISBN } = req.query;
  const booksByTitle = await searchByISBNAsync(ISBN);

  res.send({
    code: 200,
    status: "success",
    data: booksByTitle,
  });
};

const getBooksReviews = (req, res) => {
  const bookId = req.params.bookId;

  const reviews = data.reviews;

  // Filter reviews for the specified book
  const bookReviews = reviews.filter((review) => review.bookId === bookId);

  return res.status(200).json(bookReviews);
};

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  searchBooksByISBN,
  searchBooksByAuthor,
  searchBooksByTitle,
  getBooksReviews,
};
