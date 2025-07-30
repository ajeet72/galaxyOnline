import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}
