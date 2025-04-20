const express = require("express");
const data = require("../constants/data");

const router = express.Router();

/**
 * @swagger
 *   /api/reviews/{bookId}:
 *   post:
 *     summary: Review a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - review
 *             properties:
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register successfully
 */
router.post("/:bookId", (req, res) => {
  const { user } = req;
  const bookId = req.params.bookId;
  const review = req.body.review;

  const reviews = data.reviews;

  // Check if the user has already reviewed this book
  const hasAlreadyReviewed = reviews.some(
    (r) => r.bookId === bookId && r.userName === user.data
  );

  if (hasAlreadyReviewed) {
    return res
      .status(400)
      .json({ message: "You have already reviewed this book" });
  }
  reviews.push({
    bookId: bookId,
    review: review,
    userName: user.data,
  });
  data.saveReviews(reviews);
  return res.status(201).json({ message: "ok" });
});

/**
 * @swagger
 *   /api/reviews/{bookId}:
 *   put:
 *     summary: Update review a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - review
 *             properties:
 *               review:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register successfully
 */
router.put("/:bookId", (req, res) => {
  const { user } = req;
  const bookId = req.params.bookId;
  const review = req.body.review;

  const reviews = data.reviews;

  // Find the index of the user's review for this book
  const reviewIndex = reviews.findIndex(
    (r) => r.bookId === bookId && r.userName === user.data
  );

  // Check if the user has a review to update
  if (reviewIndex === -1) {
    return res
      .status(404)
      .json({ message: "You have not reviewed this book yet" });
  }

  // Update the review
  reviews[reviewIndex].review = review;

  data.saveReviews(reviews);

  return res.status(201).json({ message: "ok" });
});

/**
 * @swagger
 *   /api/reviews/{bookId}:
 *   delete:
 *     summary: Delete a book review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:bookId", (req, res) => {
  const { user } = req;
  const bookId = req.params.bookId;

  const reviews = data.reviews;

  // Find the index of the user's review for this book
  const reviewIndex = reviews.findIndex(
    (r) => r.bookId === bookId && r.userName === user.data
  );

  // Check if the user has a review to delete
  if (reviewIndex === -1) {
    return res.status(404).json({ message: "You have not reviewed this book" });
  }

  // Remove the review from the array
  reviews.splice(reviewIndex, 1);
  data.saveReviews(reviews);
  return res.status(200).json({ message: "Review deleted successfully" });
});

module.exports = router;
