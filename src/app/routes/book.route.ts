// src/app/routes/book.route.ts
import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';

const router = express.Router();

// Create a new book
router.post('/', createBook);

// Get all books (with optional filtering/sorting)
router.get('/', getAllBooks);

// Get book by ID
router.get('/:bookId', getBookById);

// Update book by ID
router.put('/:bookId', updateBook);

// Delete book by ID
router.delete('/:bookId', deleteBook);

export { router as bookRoutes };
