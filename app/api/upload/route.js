// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

        // Validate it's an image
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Build a unique filename: timestamp + original name
        const ext = path.extname(file.name) || '.jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

        // Save to public/uploads so it's served statically
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true }); // create dir if missing
        await writeFile(path.join(uploadDir, filename), buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;
        return NextResponse.json({ url }, { status: 201 });
    } catch (err) {
        console.error('[UPLOAD ERROR]', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}