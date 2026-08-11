import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  pizzaId: string;
  name: string;
  size: string;
  crust: string;
  quantity: number;
  price: number;
  customToppings?: string[];
}

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId | string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'Card' | 'bKash' | 'Nagad';
  paymentStatus: 'Pending' | 'Paid';
  estimatedDeliveryTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        pizzaId: { type: String },
        name: { type: String, required: true },
        size: { type: String, required: true },
        crust: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        customToppings: [{ type: String }],
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    estimatedDeliveryTime: { type: String, default: '30 mins' },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
