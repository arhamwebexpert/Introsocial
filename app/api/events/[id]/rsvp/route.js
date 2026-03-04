// app/api/events/[id]/rsvp/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import { getCurrentUser } from '@/lib/auth';

// POST — RSVP to an event (going / maybe / not_going)
export async function POST(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { status } = await request.json();

        if (!['going', 'maybe', 'not_going'].includes(status)) {
            return NextResponse.json({ error: 'Invalid RSVP status' }, { status: 400 });
        }

        const event = await Event.findById(id);
        if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

        // Remove existing RSVP from this user if any, then add new one
        event.rsvps = event.rsvps.filter((r) => r.userId.toString() !== user.userId);
        event.rsvps.push({ userId: user.userId, status });
        await event.save();

        return NextResponse.json({ rsvps: event.rsvps });
    } catch (err) {
        console.error('[RSVP ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}