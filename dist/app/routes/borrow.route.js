"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
// src/app/routes/borrow.route.ts
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const router = express_1.default.Router();
exports.borrowRoutes = router;
router.post('/', borrow_controller_1.borrowBook);
router.get('/', borrow_controller_1.getBorrowSummary);
