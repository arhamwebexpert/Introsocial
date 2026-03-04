// app/api/events/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import User from '@/models/User';
import Group from '@/models/Group';
import { getCurrentUser } from '@/lib/auth';

// GET /api/events?groupId=xxx
export async function GET(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const groupId = searchParams.get('groupId');
        if (!groupId) return NextResponse.json({ error: 'groupId required' }, { status: 400 });

        const allEvents = await Event.find({ groupId })
            .populate('createdBy', 'name email')
            .populate('invitedMembers', 'name email')
            .populate('rsvps.userId', 'name')
            .sort({ dateTime: 1, createdAt: -1 });

        // Filter: show public events + private events where user is invited or creator
        const visible = allEvents.filter((e) => {
            if (e.visibility === 'public') return true;
            if (e.createdBy._id.toString() === user.userId) return true;
            return e.invitedMembers.some((m) => m._id.toString() === user.userId);
        });

        return NextResponse.json({ events: visible });
    } catch (err) {
        console.error('[GET EVENTS ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/events — create event from scratch
export async function POST(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { groupId, title, description, location, dateTime, visibility, invitedMembers } = await request.json();

        if (!groupId || !title?.trim()) {
            return NextResponse.json({ error: 'groupId and title are required' }, { status: 400 });
        }

        const event = await Event.create({
            groupId, createdBy: user.userId,
            title: title.trim(),
            description: description?.trim() || '',
            location: location?.trim() || '',
            dateTime: dateTime ? new Date(dateTime) : null,
            visibility: visibility || 'public',
            invitedMembers: invitedMembers || [],
        });

        await event.populate('createdBy', 'name email');
        return NextResponse.json({ event }, { status: 201 });
    } catch (err) {
        console.error('[CREATE EVENT ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}