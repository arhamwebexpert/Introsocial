// app/api/messages/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import User from '@/models/User';
import Group from '@/models/Group';
import Event from '@/models/Event';        // ← ADD THIS LINE

import { getCurrentUser } from '@/lib/auth';

// GET /api/messages?groupId=xxx — fetch top-level messages (no parentId)
export async function GET(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const groupId = searchParams.get('groupId');
        if (!groupId) return NextResponse.json({ error: 'groupId required' }, { status: 400 });

        // Verify user is a member of the group
        const group = await Group.findById(groupId);
        if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });
        const isMember = group.members.some((m) => m.toString() === user.userId);
        if (!isMember) return NextResponse.json({ error: 'Access denied' }, { status: 403 });

        // Only fetch root messages (parentId is null)
        const messages = await Message.find({ groupId, parentId: null })
            .populate('userId', 'name email')
            .populate('promotedToEvent')
            .sort({ createdAt: 1 }); // oldest first for chat feel

        return NextResponse.json({ messages });
    } catch (err) {
        console.error('[GET MESSAGES ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/messages — send a new message
export async function POST(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { groupId, text } = await request.json();
        if (!groupId || !text?.trim()) {
            return NextResponse.json({ error: 'groupId and text are required' }, { status: 400 });
        }

        // Verify membership
        const group = await Group.findById(groupId);
        if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });
        const isMember = group.members.some((m) => m.toString() === user.userId);
        if (!isMember) return NextResponse.json({ error: 'Access denied' }, { status: 403 });

        const message = await Message.create({ groupId, userId: user.userId, text: text.trim() });
        await message.populate('userId', 'name email');

        return NextResponse.json({ message }, { status: 201 });
    } catch (err) {
        console.error('[POST MESSAGE ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}