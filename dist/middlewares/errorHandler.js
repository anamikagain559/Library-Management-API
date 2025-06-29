"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const response = {
        message: err.message || 'Internal Server Error',
        success: false,
        error: {},
    };
    // If Mongoose validation error, include details
    if (err.name === 'ValidationError') {
        response.error = err.errors || err;
    }
    else {
        // For other errors, send the error message or full error object
        response.error = err.message ? { message: err.message } : err;
    }
    res.status(statusCode).json(response);
}
