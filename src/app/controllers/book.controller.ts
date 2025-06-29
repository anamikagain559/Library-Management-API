import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
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
    next(err);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(parseInt(limit as string, 10));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (err: unknown) {
    // Type narrowing to check if err is a Mongoose CastError
    if (
      typeof err === 'object' &&
      err !== null &&
      'name' in err &&
      (err as any).name === 'CastError'
    ) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }
    next(err);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
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
    res.status(200).json({
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
    next(err);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
