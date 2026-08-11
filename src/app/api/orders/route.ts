import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { verifyJwtToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get('pizzadash_token')?.value;

    let filter = {};
    if (token) {
      const decoded = verifyJwtToken(token);
      if (decoded && decoded.role !== 'admin') {
        filter = { email: decoded.email };
      }
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { customerName, email, phone, address, items, totalAmount, paymentMethod } = body;

    if (!customerName || !email || !phone || !address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please provide all order details' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('pizzadash_token')?.value;
    let userId = null;

    if (token) {
      const decoded = verifyJwtToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    const order = await Order.create({
      user: userId,
      customerName,
      email,
      phone,
      address,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      paymentStatus: paymentMethod === 'Card' ? 'Paid' : 'Pending',
      estimatedDeliveryTime: '30 mins',
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
