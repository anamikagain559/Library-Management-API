import express,{Application, Request, Response,} from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { bookRoutes } from './routes/book.route';
import { borrowRoutes } from './routes/borrow.route';
const app = express();

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;