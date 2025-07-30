import { NextRequest, NextResponse } from 'next/server';
import { savePost, deletePost } from '@/lib/posts';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = savePost(body);
  return NextResponse.json({ message: 'Saved successfully', slug });
}

export async function DELETE(req: NextRequest) {
  const { slug } = await req.json();
  deletePost(slug);
  return NextResponse.json({ message: 'Deleted successfully' });
}
