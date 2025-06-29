import { Request, Response, NextFunction } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import mongoose from 'mongoose';

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId).session(session);
    if (!book) throw new Error('Book not found');
    if (book.copies < quantity) throw new Error('Not enough copies available');

    // Use instance method to reduce copies and update availability
    book.reduceCopies(quantity);
    await book.save({ session });

    const borrow = await Borrow.create([{ book: bookId, quantity, dueDate }], { session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow[0],
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};