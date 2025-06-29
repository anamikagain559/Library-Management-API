"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
// src/app/routes/book.route.ts
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const asyncHandler_1 = require("../../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post('/', (0, asyncHandler_1.asyncHandler)(book_controller_1.createBook));
router.get('/', (0, asyncHandler_1.asyncHandler)(book_controller_1.getAllBooks));
router.get('/:bookId', (0, asyncHandler_1.asyncHandler)(book_controller_1.getBookById));
router.put('/:bookId', (0, asyncHandler_1.asyncHandler)(book_controller_1.updateBook));
router.delete('/:bookId', (0, asyncHandler_1.asyncHandler)(book_controller_1.deleteBook));
exports.bookRoutes = router;
