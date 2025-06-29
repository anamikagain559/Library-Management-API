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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
// Create Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        return res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (err) {
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
});
exports.createBook = createBook;
// Get All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
            .limit(parseInt(limit, 10));
        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
});
exports.getAllBooks = getAllBooks;
// Get Book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
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
    }
    catch (err) {
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
});
exports.getBookById = getBookById;
// Update Book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
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
    }
    catch (err) {
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
});
exports.updateBook = updateBook;
// Delete Book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
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
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
});
exports.deleteBook = deleteBook;
