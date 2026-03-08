// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true, trim: true },

        // If this message is a thread reply (Slack style)
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },

        // If this message is an inline reply/quote (WhatsApp style)
        replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },

        // Replies are embedded as references (we query them separately)
        replyCount: { type: Number, default: 0 },

        // If this thread was promoted to an event
        promotedToEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
    },
    { timestamps: true }
);
// Force schema compilation in Next.js dev mode
if (mongoose.models.Message) {
    delete mongoose.models.Message;
}

export default mongoose.model('Message', MessageSchema);