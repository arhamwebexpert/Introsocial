// app/groups/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import MomentCard from '@/components/MomentCard';

const CameraIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export default function GroupFeedPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { id } = useParams();
    const pathname = usePathname();

    const [group, setGroup] = useState(null);
    const [moments, setMoments] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading]);

    useEffect(() => {
        if (!user || !id) return;
        fetch(`/api/groups/${id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.error) { setError(data.error); return; }
                setGroup(data.group);
            })
            .catch(() => setError('Failed to load group'));
    }, [user, id]);

    useEffect(() => {
        if (!user || !id) return;
        fetch(`/api/moments?groupId=${id}`)
            .then((r) => r.json())
            .then((data) => setMoments(data.moments || []))
            .catch(() => { })
            .finally(() => setFetching(false));
    }, [user, id]);

    const handleLikeToggle = (momentId, updatedLikes) => {
        setMoments((prev) => prev.map((m) => m._id === momentId ? { ...m, likes: updatedLikes } : m));
    };

    const handleCommentAdded = (momentId, newComment) => {
        setMoments((prev) => prev.map((m) =>
            m._id === momentId ? { ...m, comments: [...(m.comments || []), newComment] } : m
        ));
    };

    if (loading || fetching) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        border: '3px solid var(--fb-blue)',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 1rem',
                    }} />
                    <p style={{ color: 'var(--fb-text-secondary)', margin: 0 }}>Loading feed…</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <p style={{ color: 'var(--fb-red)', fontSize: '1.125rem', marginBottom: '1rem' }}>{error}</p>
                <Link href="/dashboard" style={{ color: 'var(--fb-blue)', textDecoration: 'none', fontWeight: '600' }}>
                    ← Back to dashboard
                </Link>
            </div>
        );
    }

    const initials = group?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

    return (
        <div>
            {/* Back Button */}
            <Link href="/dashboard" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'var(--fb-text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: '500',
                marginBottom: '0.75rem',
                padding: '0.25rem 0',
                transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
            >
                <BackIcon /> Dashboard
            </Link>

            {/* ── Group Header Card ── */}
            {group && (
                <div className="fb-card" style={{ marginBottom: '0.75rem', overflow: 'hidden' }}>
                    {/* Cover Photo */}
                    <div style={{
                        height: '180px',
                        background: 'linear-gradient(135deg, #1c2d5a 0%, #1877f2 60%, #0d3b8e 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {group.coverImage && (
                            <img src={group.coverImage} alt={group.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        {/* Overlay gradient for text readability */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                        }} />

                        {/* Group name on cover */}
                        <div style={{
                            position: 'absolute',
                            bottom: '1rem',
                            left: '1rem',
                            right: '1rem',
                        }}>
                            <h1 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: '#fff',
                                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                            }}>
                                {group.name}
                            </h1>
                        </div>
                    </div>

                    {/* Group meta row */}
                    <div style={{
                        padding: '0.875rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.625rem',
                    }}>
                        <div>
                            {group.description && (
                                <p style={{ margin: '0 0 0.5rem', color: 'var(--fb-text-secondary)', fontSize: '0.9375rem' }}>
                                    {group.description}
                                </p>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--fb-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    👥 {group.members?.length || 0} members
                                </span>
                                <span style={{
                                    fontSize: '0.8125rem',
                                    fontFamily: 'monospace',
                                    background: 'var(--fb-surface2)',
                                    color: 'var(--fb-text-secondary)',
                                    padding: '3px 10px',
                                    borderRadius: '6px',
                                    letterSpacing: '0.1em',
                                }}>
                                    {group.inviteCode}
                                </span>
                            </div>
                        </div>

                        <Link href={`/moments/create?groupId=${id}`} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'var(--fb-blue)',
                            color: '#fff',
                            padding: '0.55rem 1rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9375rem',
                            transition: 'background 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--fb-blue-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--fb-blue)'}
                        >
                            <CameraIcon />
                            <span>Post Moment</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* ── Tab Bar: Feed / Chat / Events ── */}
            <div className="fb-card" style={{
                marginBottom: '0.75rem',
                display: 'flex',
                borderBottom: '1px solid var(--fb-border)',
                overflow: 'hidden',
                padding: '0 0.5rem',
            }}>
                {[
                    { label: '📰 Feed', href: `/groups/${id}` },
                    { label: '💬 Chat', href: `/groups/${id}/chat` },
                    { label: '📅 Events', href: `/groups/${id}/events` },
                ].map(({ label, href }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '0.75rem 0.5rem',
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                color: isActive ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                                textDecoration: 'none',
                                borderBottom: isActive ? '3px solid var(--fb-blue)' : '3px solid transparent',
                                transition: 'color 0.15s, background 0.15s',
                                borderRadius: 'var(--fb-radius) var(--fb-radius) 0 0',
                            }}
                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--fb-hover)'; e.currentTarget.style.color = 'var(--fb-text)'; } }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isActive ? 'var(--fb-blue)' : 'var(--fb-text-secondary)'; }}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* ── Post Composer Teaser ── */}
            <div className="fb-card" style={{ padding: '0.875rem 1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--fb-blue)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.9375rem', fontWeight: '700', color: '#fff', flexShrink: 0,
                    }}>
                        {user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'}
                    </div>
                    <Link href={`/moments/create?groupId=${id}`} style={{
                        flex: 1,
                        background: 'var(--fb-surface2)',
                        borderRadius: '20px',
                        padding: '0.6rem 1rem',
                        color: 'var(--fb-text-muted)',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        display: 'block',
                        transition: 'background 0.15s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--fb-surface3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--fb-surface2)'}
                    >
                        What&apos;s on your mind?
                    </Link>
                </div>
            </div>

            {/* ── Moments Feed ── */}
            {moments.length === 0 ? (
                <div className="fb-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📸</div>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: '700', color: 'var(--fb-text)' }}>
                        No moments yet
                    </h3>
                    <p style={{ margin: '0 0 1.25rem', color: 'var(--fb-text-secondary)' }}>
                        Be the first to share a memory in this group.
                    </p>
                    <Link href={`/moments/create?groupId=${id}`} style={{
                        display: 'inline-block',
                        background: 'var(--fb-blue)',
                        color: '#fff',
                        fontWeight: '600',
                        padding: '0.625rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                    }}>
                        Post a Moment
                    </Link>
                </div>
            ) : (

                <div>
                    {moments.map((moment) => (
                        <MomentCard
                            key={moment._id}
                            moment={moment}
                            currentUserId={user?.userId}
                            onLikeToggle={handleLikeToggle}
                            onCommentAdded={handleCommentAdded}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}