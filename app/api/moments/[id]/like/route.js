// app/api/moments/[id]/like/route.js
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
        const moment = await Moment.findById(id);
        if (!moment) return NextResponse.json({ error: 'Moment not found' }, { status: 404 });

        const alreadyLiked = moment.likes.some((uid) => uid.toString() === user.userId);

        if (alreadyLiked) {
            // Unlike — remove userId
            moment.likes = moment.likes.filter((uid) => uid.toString() !== user.userId);
        } else {
            // Like — add userId
            moment.likes.push(user.userId);
        }

        await moment.save();
        return NextResponse.json({ likes: moment.likes });
    } catch (err) {
        console.error('[LIKE ERROR]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}