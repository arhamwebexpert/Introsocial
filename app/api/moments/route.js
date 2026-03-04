// app/api/moments/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Moment from '@/models/Moment';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/auth';

// GET /api/moments?groupId=xxx — fetch moments for a group
export async function GET(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const groupId = searchParams.get('groupId');

        if (!groupId) {
            return NextResponse.json({ error: 'groupId is required' }, { status: 400 });
        }

        const moments = await Moment.find({ groupId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ moments });
    } catch (err) {
        console.error('[GET MOMENTS ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/moments — create a new moment
export async function POST(request) {
    try {
        await dbConnect();
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { imageUrl, caption, groupId } = await request.json();

        if (!imageUrl || !groupId) {
            return NextResponse.json({ error: 'imageUrl and groupId are required' }, { status: 400 });
        }

        const moment = await Moment.create({
            imageUrl,
            caption: caption?.trim() || '',
            groupId,
            userId: user.userId,
        });

        // Populate userId before returning so the feed can show the author name
        await moment.populate('userId', 'name email');

        return NextResponse.json({ moment }, { status: 201 });
    } catch (err) {
        console.error('[CREATE MOMENT ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}