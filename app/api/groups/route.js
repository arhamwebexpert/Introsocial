// app/api/groups/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Group from '@/models/Group';
import User from '@/models/User';          // ← ADD THIS LINE

import { getCurrentUser } from '@/lib/auth';

// GET /api/groups — fetch all groups the current user is a member of
export async function GET() {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const groups = await Group.find({ members: user.userId })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ groups });
    } catch (err) {
        console.error('[GET GROUPS ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/groups — create a new group
export async function POST(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { name, description, coverImage } = await request.json();

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
        }

        const group = await Group.create({
            name: name.trim(),
            description: description?.trim() || '',
            coverImage: coverImage || '',
            createdBy: user.userId,
            members: [user.userId], // creator is auto-added as member
        });

        return NextResponse.json({ group }, { status: 201 });
    } catch (err) {
        console.error('[CREATE GROUP ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}