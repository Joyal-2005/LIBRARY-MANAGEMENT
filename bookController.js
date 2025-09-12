// controllers/bookController.js
const Book = require("../models/bookModel");

// Create a book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Fetch all books (with sorting)
exports.getAllBooks = async (req, res) => {
  try {
    const { sortBy, order } = req.query; 
    let sortOptions = {};
    if (sortBy === "author") sortOptions.author = order === "desc" ? -1 : 1;
    if (sortBy === "date") sortOptions.createdAt = order === "asc" ? 1 : -1;

    const books = await Book.find().sort(sortOptions);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single book by id
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search by name
exports.searchBook = async (req, res) => {
  try {
    const q = req.query.name || "";
    const books = await Book.find({ name: { $regex: q, $options: "i" } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
