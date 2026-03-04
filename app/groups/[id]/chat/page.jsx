// app/groups/[id]/chat/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import PromoteEventModal from '@/components/PromoteEventModal';

export default function ChatPage() {
    const { user, loading } = useAuth();
    const { id: groupId } = useParams();
    const router = useRouter();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const [activeThread, setActiveThread] = useState(null);
    const [replies, setReplies] = useState({});
    const [promoteTarget, setPromoteTarget] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading]);

    useEffect(() => {
        if (!user || !groupId) return;
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [user, groupId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`/api/messages?groupId=${groupId}`);
            const data = await res.json();
            if (data.messages) setMessages(data.messages);
        } catch { }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setSending(true);
        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupId, text: text.trim() }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessages((prev) => [...prev, data.message]);
                setText('');
            }
        } catch { }
        finally { setSending(false); }
    };

    const loadReplies = async (messageId) => {
        if (activeThread === messageId) { setActiveThread(null); return; }
        setActiveThread(messageId);
        try {
            const res = await fetch(`/api/messages/${messageId}/reply`);
            const data = await res.json();
            setReplies((prev) => ({ ...prev, [messageId]: data.replies || [] }));
        } catch { }
    };

    const sendReply = async (messageId, replyText) => {
        try {
            const res = await fetch(`/api/messages/${messageId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: replyText }),
            });
            const data = await res.json();
            if (res.ok) {
                setReplies((prev) => ({
                    ...prev,
                    [messageId]: [...(prev[messageId] || []), data.reply],
                }));
                setMessages((prev) =>
                    prev.map((m) =>
                        m._id === messageId ? { ...m, replyCount: (m.replyCount || 0) + 1 } : m
                    )
                );
            }
        } catch { }
    };

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    const grouped = messages.reduce((acc, msg) => {
        const date = new Date(msg.createdAt).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(msg);
        return acc;
    }, {});

    if (loading) return null;

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: 'calc(100vh - 56px)', 
            maxWidth: '100%', 
            margin: '0 auto',
            background: '#0a0e14',
        }}>

            {/* WhatsApp-style Header */}
            <div style={{ 
                background: '#1c1e22',
                padding: '0.75rem 1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                flexShrink: 0,
                borderBottom: '1px solid #2a2f38',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Link href={`/groups/${groupId}`} style={{ 
                        color: 'var(--fb-text-secondary)', 
                        textDecoration: 'none', 
                        fontSize: '1.5rem', 
                        lineHeight: 1, 
                        display: 'flex', 
                        alignItems: 'center',
                        padding: '0.25rem',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#1877f2'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
                    >
                        ←
                    </Link>
                    <div style={{
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '1rem', 
                        fontWeight: '700', 
                        color: '#fff',
                        flexShrink: 0,
                    }}>
                        💬
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#e4e6eb' }}>Group Chat</h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#8a8d91' }}>Tap message for thread</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                        href="/moments"
                        style={{
                            fontSize: '0.875rem',
                            background: '#2a2f38',
                            color: '#8a8d91',
                            padding: '0.5rem 0.875rem',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            border: '1px solid #3a3f48',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#3a3f48'; e.currentTarget.style.color = '#e4e6eb'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#2a2f38'; e.currentTarget.style.color = '#8a8d91'; }}
                    >
                        📸 Moments
                    </Link>
                    <Link
                        href={`/groups/${groupId}/events`}
                        style={{
                            fontSize: '0.875rem',
                            background: '#2a2f38',
                            color: '#8a8d91',
                            padding: '0.5rem 0.875rem',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            border: '1px solid #3a3f48',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#3a3f48'; e.currentTarget.style.color = '#e4e6eb'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#2a2f38'; e.currentTarget.style.color = '#8a8d91'; }}
                    >
                        📅 Events
                    </Link>
                </div>
            </div>

            {/* Messages area - WhatsApp style */}
            <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1rem',
                background: 'linear-gradient(to bottom, #0a0e14 0%, #0d1117 100%)',
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(24, 119, 242, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(24, 119, 242, 0.03) 0%, transparent 50%)',
            }}>
                {Object.entries(grouped).map(([date, msgs]) => (
                    <div key={date}>
                        {/* Date separator */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.5rem 0 1rem' }}>
                            <div style={{ 
                                background: '#1c1e22',
                                padding: '0.375rem 0.875rem',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#8a8d91',
                                fontWeight: '500',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            }}>
                                {formatDate(msgs[0].createdAt)}
                            </div>
                        </div>

                        {msgs.map((msg) => {
                            const isOwn = msg.userId?._id === user?.userId || msg.userId?.toString() === user?.userId;
                            const isThreadOpen = activeThread === msg._id;

                            return (
                                <div key={msg._id} className="chat-msg-group">
                                    {/* Message bubble - WhatsApp style */}
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        gap: '0.5rem', 
                                        flexDirection: isOwn ? 'row-reverse' : 'row', 
                                        marginBottom: '0.5rem',
                                        maxWidth: '85%',
                                        marginLeft: isOwn ? 'auto' : '0',
                                        marginRight: isOwn ? '0' : 'auto',
                                    }}>
                                        {/* Avatar */}
                                        {!isOwn && (
                                            <div style={{
                                                width: '32px', 
                                                height: '32px', 
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                fontSize: '0.875rem', 
                                                fontWeight: '700', 
                                                color: '#fff',
                                                flexShrink: 0,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            }}>
                                                {msg.userId?.name?.[0]?.toUpperCase() || '?'}
                                            </div>
                                        )}

                                        <div style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: isOwn ? 'flex-end' : 'flex-start',
                                            flex: 1,
                                            minWidth: 0,
                                        }}>
                                            {/* Username */}
                                            {!isOwn && (
                                                <span style={{ 
                                                    fontSize: '0.8125rem', 
                                                    fontWeight: '600', 
                                                    color: '#1877f2', 
                                                    marginBottom: '0.25rem',
                                                    marginLeft: '0.5rem',
                                                }}>
                                                    {msg.userId?.name || 'Unknown User'}
                                                </span>
                                            )}

                                            {/* Bubble */}
                                            <div style={{
                                                background: isOwn 
                                                    ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' 
                                                    : '#1c1e22',
                                                color: '#fff',
                                                padding: '0.625rem 0.875rem',
                                                borderRadius: isOwn 
                                                    ? '16px 16px 4px 16px' 
                                                    : '16px 16px 16px 4px',
                                                fontSize: '0.9375rem',
                                                lineHeight: '1.4',
                                                position: 'relative',
                                                wordBreak: 'break-word',
                                                boxShadow: isOwn 
                                                    ? '0 2px 8px rgba(24, 119, 242, 0.4)' 
                                                    : '0 2px 4px rgba(0,0,0,0.3)',
                                                border: msg.promotedToEvent ? '2px solid #25d366' : 'none',
                                                maxWidth: '100%',
                                            }}>
                                                {msg.text}
                                                {msg.promotedToEvent && (
                                                    <span style={{ 
                                                        marginLeft: '6px', 
                                                        fontSize: '0.75rem', 
                                                        color: '#25d366',
                                                        fontWeight: '600',
                                                    }}>
                                                        📅 Event
                                                    </span>
                                                )}
                                                
                                                {/* Time stamp inside bubble */}
                                                <div style={{ 
                                                    fontSize: '0.6875rem', 
                                                    color: isOwn ? 'rgba(255,255,255,0.7)' : '#8a8d91',
                                                    marginTop: '0.25rem',
                                                    textAlign: 'right',
                                                }}>
                                                    {formatTime(msg.createdAt)}
                                                </div>
                                            </div>

                                            {/* Actions row — shown on hover via CSS */}
                                            <div className="chat-actions" style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.5rem', 
                                                marginTop: '0.25rem',
                                                opacity: 0, 
                                                transition: 'opacity 0.2s',
                                            }}>
                                                <button
                                                    onClick={() => loadReplies(msg._id)}
                                                    style={{ 
                                                        background: '#1c1e22',
                                                        border: '1px solid #2a2f38',
                                                        cursor: 'pointer', 
                                                        fontSize: '0.75rem', 
                                                        color: '#8a8d91',
                                                        fontFamily: 'inherit', 
                                                        padding: '0.25rem 0.625rem',
                                                        borderRadius: '12px',
                                                        transition: 'all 0.2s',
                                                        fontWeight: '500',
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = '#2a2f38'; e.currentTarget.style.color = '#1877f2'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = '#1c1e22'; e.currentTarget.style.color = '#8a8d91'; }}
                                                >
                                                    💬 {msg.replyCount > 0 ? `${msg.replyCount}` : 'Reply'}
                                                </button>

                                                {!msg.promotedToEvent && (
                                                    <button
                                                        onClick={() => setPromoteTarget(msg)}
                                                        style={{ 
                                                            background: '#1c1e22',
                                                            border: '1px solid #2a2f38',
                                                            cursor: 'pointer', 
                                                            fontSize: '0.75rem', 
                                                            color: '#8a8d91',
                                                            fontFamily: 'inherit', 
                                                            padding: '0.25rem 0.625rem',
                                                            borderRadius: '12px',
                                                            transition: 'all 0.2s',
                                                            fontWeight: '500',
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = '#2a2f38'; e.currentTarget.style.color = '#25d366'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = '#1c1e22'; e.currentTarget.style.color = '#8a8d91'; }}
                                                    >
                                                        📅 Event
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thread panel */}
                                    {isThreadOpen && (
                                        <ThreadPanel
                                            messageId={msg._id}
                                            replies={replies[msg._id] || []}
                                            onReply={sendReply}
                                            currentUserId={user?.userId}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                        <p style={{ fontSize: '4rem', marginBottom: '0.75rem', opacity: 0.3 }}>💬</p>
                        <p style={{ color: '#8a8d91', margin: 0, fontSize: '0.9375rem' }}>No messages yet. Start the conversation!</p>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Message input - WhatsApp style */}
            <div style={{ 
                background: '#1c1e22',
                padding: '0.875rem 1rem',
                flexShrink: 0,
                borderTop: '1px solid #2a2f38',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
            }}>
                <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{
                            flex: 1,
                            borderRadius: '24px',
                            margin: 0,
                            padding: '0.75rem 1.125rem',
                            fontSize: '0.9375rem',
                            background: '#2a2f38',
                            border: '1px solid #3a3f48',
                            color: '#e4e6eb',
                            outline: 'none',
                            transition: 'all 0.2s',
                        }}
                        onFocus={(e) => { e.target.style.background = '#3a3f48'; e.target.style.borderColor = '#1877f2'; }}
                        onBlur={(e) => { e.target.style.background = '#2a2f38'; e.target.style.borderColor = '#3a3f48'; }}
                    />
                    <button
                        type="submit"
                        disabled={sending || !text.trim()}
                        style={{
                            width: '48px',
                            height: '48px',
                            padding: 0,
                            borderRadius: '50%',
                            background: text.trim() ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' : '#2a2f38',
                            color: '#fff',
                            border: 'none',
                            cursor: text.trim() ? 'pointer' : 'not-allowed',
                            fontSize: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            boxShadow: text.trim() ? '0 2px 8px rgba(24, 119, 242, 0.4)' : 'none',
                            opacity: text.trim() ? 1 : 0.5,
                        }}
                        onMouseEnter={(e) => { if (text.trim()) e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        {sending ? '...' : '➤'}
                    </button>
                </form>
            </div>

            {/* Promote to event modal */}
            {promoteTarget && (
                <PromoteEventModal
                    message={promoteTarget}
                    groupId={groupId}
                    onClose={() => setPromoteTarget(null)}
                    onPromoted={(event) => {
                        setMessages((prev) =>
                            prev.map((m) => m._id === promoteTarget._id ? { ...m, promotedToEvent: event } : m)
                        );
                        setPromoteTarget(null);
                    }}
                />
            )}

            {/* Hover styles */}
            <style>{`
                .chat-msg-group:hover .chat-actions { opacity: 1 !important; }
            `}</style>
        </div>
    );
}

// ── Thread panel ─────────────────────────────────────────────────────
function ThreadPanel({ messageId, replies, onReply, currentUserId }) {
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        setSending(true);
        await onReply(messageId, replyText.trim());
        setReplyText('');
        setSending(false);
    };

    return (
        <div style={{ 
            marginLeft: '2.5rem', 
            marginTop: '0.5rem', 
            marginBottom: '1rem', 
            padding: '1rem',
            background: '#1c1e22',
            borderRadius: '12px',
            borderLeft: '3px solid #1877f2',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
            <p style={{ 
                margin: '0 0 0.875rem', 
                fontSize: '0.75rem', 
                color: '#8a8d91', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
            }}>
                💬 Thread
            </p>

            <div style={{ marginBottom: '0.875rem', maxHeight: '200px', overflowY: 'auto' }}>
                {replies.length === 0 && (
                    <p style={{ fontSize: '0.8125rem', color: '#8a8d91', fontStyle: 'italic', margin: 0 }}>
                        No replies yet. Start the thread!
                    </p>
                )}
                {replies.map((r) => (
                    <div key={r._id} style={{ 
                        display: 'flex', 
                        gap: '0.625rem', 
                        alignItems: 'flex-start', 
                        marginBottom: '0.75rem',
                        padding: '0.625rem',
                        background: '#2a2f38',
                        borderRadius: '8px',
                    }}>
                        <div style={{
                            width: '28px', 
                            height: '28px', 
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '0.75rem', 
                            fontWeight: '700', 
                            color: '#fff',
                            flexShrink: 0,
                        }}>
                            {r.userId?.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ 
                                fontSize: '0.8125rem', 
                                fontWeight: '600', 
                                color: '#1877f2',
                                display: 'block',
                                marginBottom: '0.25rem',
                            }}>
                                {r.userId?.name}
                            </span>
                            <span style={{ 
                                fontSize: '0.875rem', 
                                color: '#e4e6eb',
                                wordBreak: 'break-word',
                            }}>
                                {r.text}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleReply} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Reply in thread..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{
                        flex: 1,
                        margin: 0,
                        fontSize: '0.875rem',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '20px',
                        background: '#2a2f38',
                        border: '1px solid #3a3f48',
                        color: '#e4e6eb',
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    disabled={sending || !replyText.trim()}
                    style={{
                        width: '36px',
                        height: '36px',
                        padding: 0,
                        borderRadius: '50%',
                        fontSize: '1rem',
                        background: replyText.trim() ? 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)' : '#2a2f38',
                        color: '#fff',
                        border: 'none',
                        cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: replyText.trim() ? 1 : 0.5,
                    }}
                >
                    {sending ? '...' : '➤'}
                </button>
            </form>
        </div>
    );
}