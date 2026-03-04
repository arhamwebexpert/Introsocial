// app/api/moments/[id]/comment/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Moment from '@/models/Moment';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { text } = await request.json();

        if (!text?.trim()) {
            return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
        }

        const moment = await Moment.findById(id);
        if (!moment) return NextResponse.json({ error: 'Moment not found' }, { status: 404 });

        // Push new comment with userId and text
        const comment = { userId: user.userId, text: text.trim(), createdAt: new Date() };
        moment.comments.push(comment);
        await moment.save();

        // Return the comment with user name attached for immediate UI display
        const newComment = {
            ...comment,
            userId: { _id: user.userId, name: user.name },
        };

        return NextResponse.json({ comment: newComment }, { status: 201 });
    } catch (err) {
        console.error('[COMMENT ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}