import mongoose, { Schema, Document } from 'mongoose';

export interface IPizza extends Document {
  name: string;
  category: 'popular' | 'vegetarian' | 'spicy' | 'gourmet' | 'classic';
  price: number;
  description: string;
  image: string;
  rating: number;
  badge?: string;
  ingredients: string[];
  crustOptions: string[];
  sizeOptions: { name: string; priceMultiplier: number }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PizzaSchema = new Schema<IPizza>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    badge: { type: String, default: '' },
    ingredients: [{ type: String }],
    crustOptions: [{ type: String }],
    sizeOptions: [
      {
        name: { type: String },
        priceMultiplier: { type: Number },
      },
    ],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Pizza = mongoose.models.Pizza || mongoose.model<IPizza>('Pizza', PizzaSchema);
