const express = require("express");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middlewares/auth");

const User = require("../models/User");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ date: -1 });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, author, pages, description, dateStarted, dateFinished } =
      req.body;

    try {
      const newBook = new Book({
        name,
        author,
        pages,
        description,
        dateStarted,
        dateFinished,
        user: req.user.id,
      });

      const book = await newBook.save();

      res.json(book);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
router.put("/:id", (req, res) => {
  res.send("put book");
});
router.delete("/:id", (req, res) => {
  res.send("delete book");
});

module.exports = router;