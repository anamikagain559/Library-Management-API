import express, { Application } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { bookRoutes } from './app/routes/book.route';
import { borrowRoutes } from './app/routes/borrow.route';
const app: Application = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to the API library.');
});
// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;