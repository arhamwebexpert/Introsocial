// components/MomentCard.jsx
'use client';

import { useState } from 'react';

const ThumbsUp = ({ filled }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </svg>
);

const CommentBubble = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

function timeAgo(dateStr) {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function MomentCard({ moment, currentUserId, onLikeToggle, onCommentAdded }) {
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [likePending, setLikePending] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const isLiked = moment.likes?.some((id) => id === currentUserId || id?._id === currentUserId);
    const likeCount = moment.likes?.length || 0;
    const commentCount = moment.comments?.length || 0;

    const initials = (moment.userId?.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    const handleLike = async () => {
        if (likePending) return;
        setLikePending(true);
        try {
            const res = await fetch(`/api/moments/${moment._id}/like`, { method: 'POST' });
            const data = await res.json();
            if (res.ok) onLikeToggle(moment._id, data.likes);
        } catch { }
        finally { setLikePending(false); }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setSubmittingComment(true);
        try {
            const res = await fetch(`/api/moments/${moment._id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: commentText.trim() }),
            });
            const data = await res.json();
            if (res.ok) {
                onCommentAdded(moment._id, data.comment);
                setCommentText('');
                setShowComments(true);
            }
        } catch { }
        finally { setSubmittingComment(false); }
    };

    return (
        <div className="fb-card" style={{ marginBottom: '0.75rem' }}>
            {/* ── Post Header ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem 0.5rem',
            }}>
                {/* Avatar */}
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1877f2, #0d47a1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9375rem',
                    fontWeight: '700',
                    color: '#fff',
                    flexShrink: 0,
                }}>
                    {initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9375rem', color: 'var(--fb-text)' }}>
                        {moment.userId?.name || 'Unknown'}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--fb-text-muted)' }}>
                        {timeAgo(moment.createdAt)}
                    </p>
                </div>
            </div>

            {/* ── Caption ── */}
            {moment.caption && (
                <p style={{
                    margin: '0.25rem 0 0.5rem',
                    padding: '0 1rem',
                    fontSize: '0.9375rem',
                    color: 'var(--fb-text)',
                    lineHeight: '1.5',
                }}>
                    {moment.caption}
                </p>
            )}

            {/* ── Image ── */}
            {moment.imageUrl && (
                <div style={{ marginTop: '0.5rem', background: 'var(--fb-bg)' }}>
                    <img
                        src={moment.imageUrl}
                        alt={moment.caption || 'Moment'}
                        style={{
                            width: '100%',
                            maxHeight: '500px',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </div>
            )}

            {/* ── Stats row (like count + comment count) ── */}
            {(likeCount > 0 || commentCount > 0) && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    color: 'var(--fb-text-muted)',
                }}>
                    {likeCount > 0 && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'var(--fb-blue)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.625rem',
                            }}>👍</span>
                            {likeCount}
                        </span>
                    )}
                    {commentCount > 0 && (
                        <button
                            onClick={() => setShowComments(v => !v)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--fb-text-muted)',
                                fontSize: '0.875rem',
                                marginLeft: 'auto',
                            }}
                        >
                            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                        </button>
                    )}
                </div>
            )}

            <div style={{ borderTop: '1px solid var(--fb-border)' }} />

            {/* ── Action Bar ── */}
            <div style={{
                display: 'flex',
                padding: '0.25rem 0.5rem',
            }}>
                <button
                    onClick={handleLike}
                    disabled={likePending}
                    className={`fb-action-btn${isLiked ? ' liked' : ''}`}
                    style={{ color: isLiked ? 'var(--fb-blue)' : undefined }}
                >
                    <ThumbsUp filled={isLiked} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button
                    onClick={() => { setShowComments(v => !v); }}
                    className="fb-action-btn"
                >
                    <CommentBubble />
                    <span>Comment</span>
                </button>
            </div>

            {/* ── Comments Section ── */}
            {showComments && commentCount > 0 && (
                <div style={{
                    borderTop: '1px solid var(--fb-border)',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                }}>
                    {moment.comments.map((c, i) => {
                        const cInitials = (c.userId?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
                        return (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'var(--fb-surface2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.6875rem',
                                    fontWeight: '700',
                                    color: 'var(--fb-text)',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}>
                                    {cInitials}
                                </div>
                                <div style={{
                                    background: 'var(--fb-surface2)',
                                    borderRadius: '0 12px 12px 12px',
                                    padding: '0.375rem 0.75rem',
                                    maxWidth: '85%',
                                }}>
                                    <p style={{ margin: '0 0 2px', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text)' }}>
                                        {c.userId?.name || 'User'}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--fb-text-secondary)' }}>
                                        {c.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Comment Input ── */}
            <div style={{
                borderTop: commentCount > 0 && showComments ? 'none' : '1px solid var(--fb-border)',
                padding: '0.625rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                <form onSubmit={handleComment} style={{ display: 'flex', flex: 1, gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'var(--fb-surface2)',
                            border: '1px solid transparent',
                            borderRadius: '20px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9375rem',
                            color: 'var(--fb-text)',
                            outline: 'none',
                            transition: 'border-color 0.15s',
                            fontFamily: 'inherit',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'var(--fb-blue)'; }}
                        onBlur={e => { e.target.style.borderColor = 'transparent'; }}
                    />
                    {commentText.trim() && (
                        <button
                            type="submit"
                            disabled={submittingComment}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'var(--fb-blue)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                flexShrink: 0,
                                transition: 'background 0.15s',
                            }}
                        >
                            <SendIcon />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}