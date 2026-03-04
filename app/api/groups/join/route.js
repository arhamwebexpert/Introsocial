// app/api/groups/join/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Group from '@/models/Group';
import { getCurrentUser } from '@/lib/auth';

// POST /api/groups/join — join a group using an invite code
export async function POST(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { inviteCode } = await request.json();

        if (!inviteCode?.trim()) {
            return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
        }

        const group = await Group.findOne({ inviteCode: inviteCode.trim().toUpperCase() });

        if (!group) {
            return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
        }

        // Check if already a member
        const alreadyMember = group.members.some(
            (id) => id.toString() === user.userId
        );

        if (alreadyMember) {
            return NextResponse.json({ error: 'You are already in this group' }, { status: 409 });
        }

        // Add user to members
        group.members.push(user.userId);
        await group.save();

        return NextResponse.json({ group, message: 'Joined successfully' });
    } catch (err) {
        console.error('[JOIN GROUP ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}