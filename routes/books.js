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

router.put("/:id", auth, async (req, res) => {
  const { name, author, pages, description, dateStarted, dateFinished } =
    req.body;

  const bookFields = {};
  if (name) bookFields.name = name;
  if (author) bookFields.author = author;
  if (pages) bookFields.pages = pages;
  if (description) bookFields.description = description;
  if (dateStarted) bookFields.dateStarted = dateStarted;
  if (dateFinished) bookFields.dateFinished = dateFinished;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: bookFields },
      { new: true }
    );

    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    await Book.findByIdAndRemove(req.params.id);

    res.json({ message: `Book with the title '${book.name}' is removed` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;