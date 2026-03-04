// app/api/messages/[id]/promote/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/models/Message';
import Event from '@/models/Event';
import { getCurrentUser } from '@/lib/auth';

// POST — promote a message thread to an event
export async function POST(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { title, description, location, dateTime, visibility, invitedMembers } = await request.json();

        if (!title?.trim()) return NextResponse.json({ error: 'Event title is required' }, { status: 400 });

        const message = await Message.findById(id);
        if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

        // Create the event linked to this message thread
        const event = await Event.create({
            groupId: message.groupId,
            createdBy: user.userId,
            title: title.trim(),
            description: description?.trim() || '',
            location: location?.trim() || '',
            dateTime: dateTime ? new Date(dateTime) : null,
            visibility: visibility || 'public',
            invitedMembers: invitedMembers || [],
            sourceMessageId: id,
        });

        // Mark the message as promoted
        message.promotedToEvent = event._id;
        await message.save();

        return NextResponse.json({ event }, { status: 201 });
    } catch (err) {
        console.error('[PROMOTE ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}