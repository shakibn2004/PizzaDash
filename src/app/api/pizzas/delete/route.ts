import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { Pizza } from '@/models/Pizza';
import { User } from '@/models/User';
import { verifyJwtToken } from '@/lib/auth';

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('pizzadash_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyJwtToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const dbUser = await User.findById(decoded.userId);

    if (!dbUser || dbUser.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Admin authorization required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const pizzaId = searchParams.get('id');

    if (!pizzaId) {
      return NextResponse.json({ success: false, message: 'Pizza ID required' }, { status: 400 });
    }

    await connectDB();
    await Pizza.findByIdAndDelete(pizzaId);

    return NextResponse.json({ success: true, message: 'Pizza deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || 'Server error' }, { status: 500 });
  }
}
