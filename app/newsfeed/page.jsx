// app/newsfeed/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import MomentCard from '@/components/MomentCard';

export default function NewsFeedPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [moments, setMoments] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;
        fetchMoments();
    }, [user]);

    const fetchMoments = async () => {
        try {
            const res = await fetch('/api/moments');
            const data = await res.json();
            setMoments(data.moments || []);
        } catch (error) {
            console.error('Failed to fetch moments:', error);
        } finally {
            setFetching(false);
        }
    };

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
                    <p style={{ color: 'var(--fb-text-secondary)', margin: 0 }}>Loading News Feed…</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Header */}
            <div className="fb-card" style={{ marginBottom: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: '800', color: 'var(--fb-text)' }}>
                        📰 News Feed
                    </h1>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--fb-text-muted)' }}>
                        See the latest moments from all your groups
                    </p>
                </div>
            </div>

            {/* Moments Feed */}
            {moments.length === 0 ? (
                <div className="fb-card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>📰</div>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: '700', color: 'var(--fb-text)' }}>
                        Your feed is empty
                    </h3>
                    <p style={{ margin: '0 0 1.5rem', color: 'var(--fb-text-secondary)' }}>
                        You will see posts from your groups here once activity happens.
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
