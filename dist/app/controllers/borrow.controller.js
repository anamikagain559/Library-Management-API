"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const mongoose_1 = __importDefault(require("mongoose"));
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield book_model_1.Book.findById(bookId).session(session);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < quantity)
            throw new Error('Not enough copies available');
        // Use instance method to reduce copies and update availability
        book.reduceCopies(quantity);
        yield book.save({ session });
        const borrow = yield borrow_model_1.Borrow.create([{ book: bookId, quantity, dueDate }], { session });
        yield session.commitTransaction();
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow[0],
        });
    }
    catch (err) {
        yield session.abortTransaction();
        next(err);
    }
    finally {
        session.endSession();
    }
});
exports.borrowBook = borrowBook;
const getBorrowSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (err) {
        next(err);
    }
});
exports.getBorrowSummary = getBorrowSummary;
