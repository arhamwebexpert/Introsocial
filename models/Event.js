// models/Event.js
import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['going', 'maybe', 'not_going'], required: true },
});

const EventSchema = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        title: { type: String, required: true, trim: true },
        description: { type: String, default: '', trim: true },
        location: { type: String, default: '', trim: true },
        dateTime: { type: Date, default: null },

        // public = all group members see it
        // private = only invitedMembers see it
        visibility: { type: String, enum: ['public', 'private'], default: 'public' },
        invitedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

        rsvps: [RSVPSchema],

        // Link back to the message thread it came from (if promoted)
        sourceMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
    },
    { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);