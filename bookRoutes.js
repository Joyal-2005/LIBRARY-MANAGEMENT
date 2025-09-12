
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookController");
const Book = require("../models/bookModel");

router.post("/", ctrl.createBook);                // Create book
router.get("/", ctrl.getAllBooks);                // Get all books
router.get("/search", ctrl.searchBook);           // Search by name
router.get("/:id", ctrl.getBook);                 // Get single book
router.put("/:id", ctrl.updateBook);              // Update book
router.delete("/:id", ctrl.deleteBook);           // Delete book

module.exports = router;
