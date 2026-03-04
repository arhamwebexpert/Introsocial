// app/api/messages/[id]/reply/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/auth';

// GET — fetch all replies to a message thread
export async function GET(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const replies = await Message.find({ parentId: id })
            .populate('userId', 'name email')
            .sort({ createdAt: 1 });

        return NextResponse.json({ replies });
    } catch (err) {
        console.error('[GET REPLIES ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST — reply to a message (creates a thread)
export async function POST(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { text } = await request.json();
        if (!text?.trim()) return NextResponse.json({ error: 'text is required' }, { status: 400 });

        // Find parent message to get groupId
        const parent = await Message.findById(id);
        if (!parent) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

        // Create reply
        const reply = await Message.create({
            groupId: parent.groupId,
            userId: user.userId,
            text: text.trim(),
            parentId: id,
        });

        // Increment parent reply count
        parent.replyCount += 1;
        await parent.save();

        await reply.populate('userId', 'name email');
        return NextResponse.json({ reply }, { status: 201 });
    } catch (err) {
        console.error('[REPLY ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}