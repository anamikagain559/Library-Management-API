// src/app/models/book.model.ts
import { Schema, model, Document } from 'mongoose';

// Genre enum
export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

// Book interface
export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  reduceCopies(quantity: number): void;
}

// Book schema
const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Instance method
bookSchema.methods.reduceCopies = function (this: IBook, quantity: number) {
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.available = false;
  }
};

export const Book = model<IBook>('Book', bookSchema);

// Add instance method to handle business logic
bookSchema.methods.reduceCopies = function (this: IBook, quantity: number) {
  this.copies -= quantity;
  if (this.copies <= 0) {
    this.available = false;
  }
};
