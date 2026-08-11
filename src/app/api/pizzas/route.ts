import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Pizza } from '@/models/Pizza';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let filter = {};
    if (category && category !== 'all') {
      filter = { category: category.toLowerCase() };
    }

    const pizzas = await Pizza.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      pizzas,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to fetch pizzas' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const pizza = await Pizza.create(body);

    return NextResponse.json({
      success: true,
      pizza,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create pizza' },
      { status: 500 }
    );
  }
}
