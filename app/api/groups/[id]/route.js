// app/api/groups/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Group from '@/models/Group';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;   // ← await params first

        const group = await Group.findById(id)
            .populate('members', 'name email')
            .populate('createdBy', 'name email');

        if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });

        const isMember = group.members.some((m) => m._id.toString() === user.userId);
        if (!isMember) {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }

        return NextResponse.json({ group });
    } catch (err) {
        console.error('[GET GROUP ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}