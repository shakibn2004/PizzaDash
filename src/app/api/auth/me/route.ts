import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyJwtToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('pizzadash_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, user: null, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyJwtToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, user: null, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, user: null, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || '',
        address: user.address || '',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
