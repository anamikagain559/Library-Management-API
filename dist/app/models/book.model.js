"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Genre = void 0;
// src/app/models/book.model.ts
const mongoose_1 = require("mongoose");
// Genre enum
var Genre;
(function (Genre) {
    Genre["FICTION"] = "FICTION";
    Genre["NON_FICTION"] = "NON_FICTION";
    Genre["SCIENCE"] = "SCIENCE";
    Genre["HISTORY"] = "HISTORY";
    Genre["BIOGRAPHY"] = "BIOGRAPHY";
    Genre["FANTASY"] = "FANTASY";
})(Genre || (exports.Genre = Genre = {}));
// Book schema
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
    },
    genre: {
        type: String,
        enum: Object.values(Genre),
        required: [true, 'Genre is required'],
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, 'Copies are required'],
        min: [0, 'Copies must be a non-negative number'],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
// Instance method
bookSchema.methods.reduceCopies = function (quantity) {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.available = false;
    }
};
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
// Add instance method to handle business logic
bookSchema.methods.reduceCopies = function (quantity) {
    this.copies -= quantity;
    if (this.copies <= 0) {
        this.available = false;
    }
};
