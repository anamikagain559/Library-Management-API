// src/app/routes/book.route.ts
import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(createBook));
router.get('/', asyncHandler(getAllBooks));
router.get('/:bookId', asyncHandler(getBookById));
router.put('/:bookId', asyncHandler(updateBook));
router.delete('/:bookId', asyncHandler(deleteBook));

export const bookRoutes = router;
