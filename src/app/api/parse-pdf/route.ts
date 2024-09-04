// src/app/api/parse-pdf/route.ts

import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as Blob[]; // Получаем массив файлов

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const texts = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const data = await pdfParse(Buffer.from(arrayBuffer));
        return data.text;
      })
    );

    return NextResponse.json({ texts }); // Возвращаем массив текстов
  } catch (error) {
    console.error('Error parsing PDFs:', error);
    return NextResponse.json({ error: 'Failed to parse PDFs' }, { status: 500 });
  }
}
