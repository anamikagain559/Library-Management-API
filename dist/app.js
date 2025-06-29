"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const book_route_1 = require("./app/routes/book.route");
const borrow_route_1 = require("./app/routes/borrow.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use('/api/books', book_route_1.bookRoutes);
app.use('/api/borrow', borrow_route_1.borrowRoutes);
// Error handler middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
