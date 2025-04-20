const { readData, writeData } = require("../utils/fileUtils");

module.exports = {
  get books() {
    return readData("books");
  },
  get users() {
    return readData("users");
  },
  get reviews() {
    return readData("reviews");
  },

  saveBooks(books) {
    return writeData("books", books);
  },
  saveUsers(users) {
    return writeData("users", users);
  },
  saveReviews(reviews) {
    return writeData("reviews", reviews);
  },
};
