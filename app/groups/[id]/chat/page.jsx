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
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)', maxWidth: '700px', margin: '0 auto' }}>

            {/* Header */}
            <div className="fb-card" style={{ marginBottom: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Link href={`/groups/${groupId}`} style={{ color: 'var(--fb-text-secondary)', textDecoration: 'none', fontSize: '1.25rem', lineHeight: 1, display: 'flex', alignItems: 'center' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
                    >
                        ←
                    </Link>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: '700', color: 'var(--fb-text)' }}>Group Chat</h1>
                        <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--fb-text-muted)' }}>Click a message to open thread · Promote to Event</p>
                    </div>
                </div>
                <Link
                    href={`/groups/${groupId}/events`}
                    style={{
                        fontSize: '0.875rem',
                        background: 'var(--fb-surface2)',
                        color: 'var(--fb-text-secondary)',
                        padding: '0.4rem 0.875rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        border: '1px solid var(--fb-border)',
                        transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--fb-surface3)'; e.currentTarget.style.color = 'var(--fb-text)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--fb-surface2)'; e.currentTarget.style.color = 'var(--fb-text-secondary)'; }}
                >
                    📅 Events
                </Link>
            </div>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                {Object.entries(grouped).map(([date, msgs]) => (
                    <div key={date}>
                        {/* Date separator */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
                            <div style={{ flex: 1, height: '1px', background: 'var(--fb-border)' }} />
                            <span style={{ fontSize: '0.75rem', color: 'var(--fb-text-muted)', whiteSpace: 'nowrap' }}>{formatDate(msgs[0].createdAt)}</span>
                            <div style={{ flex: 1, height: '1px', background: 'var(--fb-border)' }} />
                        </div>

                        {msgs.map((msg) => {
                            const isOwn = msg.userId?._id === user?.userId || msg.userId?.toString() === user?.userId;
                            const isThreadOpen = activeThread === msg._id;

                            return (
                                <div key={msg._id} className="chat-msg-group">
                                    {/* Message bubble */}
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexDirection: isOwn ? 'row-reverse' : 'row', marginBottom: '2px' }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: 'var(--fb-blue)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.75rem', fontWeight: '700', color: '#fff',
                                            flexShrink: 0, marginBottom: '4px',
                                        }}>
                                            {msg.userId?.name?.[0]?.toUpperCase() || '?'}
                                        </div>

                                        <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                                            {!isOwn && (
                                                <span style={{ fontSize: '0.75rem', color: 'var(--fb-text-muted)', marginLeft: '4px', marginBottom: '3px' }}>{msg.userId?.name}</span>
                                            )}

                                            {/* Bubble */}
                                            <div style={{
                                                background: isOwn ? 'var(--fb-blue)' : 'var(--fb-surface2)',
                                                color: 'var(--fb-text)',
                                                padding: '0.5rem 0.875rem',
                                                borderRadius: isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                fontSize: '0.9375rem',
                                                lineHeight: '1.4',
                                                outline: msg.promotedToEvent ? '1px solid var(--fb-blue)' : 'none',
                                                position: 'relative',
                                            }}>
                                                {msg.text}
                                                {msg.promotedToEvent && (
                                                    <span style={{ marginLeft: '6px', fontSize: '0.75rem', color: isOwn ? 'rgba(255,255,255,0.8)' : 'var(--fb-text-secondary)' }}>📅 Event</span>
                                                )}
                                            </div>

                                            {/* Actions row — shown on hover via CSS */}
                                            <div className="chat-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '3px', flexDirection: isOwn ? 'row-reverse' : 'row', opacity: 0, transition: 'opacity 0.15s' }}>
                                                <span style={{ fontSize: '0.6875rem', color: 'var(--fb-text-muted)' }}>{formatTime(msg.createdAt)}</span>

                                                <button
                                                    onClick={() => loadReplies(msg._id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--fb-text-secondary)', fontFamily: 'inherit', padding: '0 4px', transition: 'color 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-blue)'}
                                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
                                                >
                                                    💬 {msg.replyCount > 0 ? `${msg.replyCount} replies` : 'Reply'}
                                                </button>

                                                {!msg.promotedToEvent && (
                                                    <button
                                                        onClick={() => setPromoteTarget(msg)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--fb-text-secondary)', fontFamily: 'inherit', padding: '0 4px', transition: 'color 0.15s' }}
                                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
                                                    >
                                                        📅 Make Event
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
                        <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>💬</p>
                        <p style={{ color: 'var(--fb-text-muted)', margin: 0 }}>No messages yet. Say hello!</p>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Message input */}
            <div className="fb-card" style={{ marginTop: '0.75rem', padding: '0.75rem', flexShrink: 0 }}>
                <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Write a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="fb-input"
                        style={{ flex: 1, borderRadius: '20px', margin: 0, padding: '0.6rem 1rem', fontSize: '0.9375rem' }}
                    />
                    <button
                        type="submit"
                        disabled={sending || !text.trim()}
                        className="btn-primary"
                        style={{ width: 'auto', padding: '0.6rem 1.25rem', borderRadius: '20px', whiteSpace: 'nowrap' }}
                    >
                        {sending ? '...' : 'Send'}
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
        <div className="fb-card" style={{ marginLeft: '2.5rem', marginTop: '4px', marginBottom: '0.75rem', padding: '0.875rem', borderLeft: '3px solid var(--fb-blue)' }}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', color: 'var(--fb-text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thread</p>

            <div style={{ marginBottom: '0.75rem', maxHeight: '180px', overflowY: 'auto' }}>
                {replies.length === 0 && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--fb-text-muted)', fontStyle: 'italic', margin: 0 }}>No replies yet</p>
                )}
                {replies.map((r) => (
                    <div key={r._id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            background: 'var(--fb-surface3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.6875rem', fontWeight: '700', color: 'var(--fb-text)',
                            flexShrink: 0,
                        }}>
                            {r.userId?.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)' }}>{r.userId?.name} </span>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--fb-text)' }}>{r.text}</span>
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
                    className="fb-input"
                    style={{ flex: 1, margin: 0, fontSize: '0.875rem', padding: '0.5rem 0.875rem', borderRadius: '16px' }}
                />
                <button
                    type="submit"
                    disabled={sending || !replyText.trim()}
                    className="btn-primary"
                    style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '16px', fontSize: '0.875rem' }}
                >
                    {sending ? '...' : '↑'}
                </button>
            </form>
        </div>
    );
}