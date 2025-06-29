import { Schema, model, Document, Types } from 'mongoose';

// Borrow interface
export interface IBorrow extends Document {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Borrow schema
const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
