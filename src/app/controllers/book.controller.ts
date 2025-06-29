import { Request, Response } from 'express';
import { Book } from '../models/book.model';

// Create Book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: err.errors,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message || 'Unexpected error',
    });
  }
};

// Get All Books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = filter ? { genre: filter } : {};

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string, 10));

    return res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Get Book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (err: any) {
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Update Book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: err.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// Delete Book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};
