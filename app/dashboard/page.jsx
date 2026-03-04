// app/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import GroupCard from '@/components/GroupCard';

const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const KeyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [groups, setGroups] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [inviteCode, setInviteCode] = useState('');
    const [joinError, setJoinError] = useState('');
    const [joinLoading, setJoinLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading]);

    useEffect(() => {
        if (!user) return;
        fetch('/api/groups')
            .then((r) => r.json())
            .then((data) => setGroups(data.groups || []))
            .catch(() => { })
            .finally(() => setFetching(false));
    }, [user]);

    const handleJoin = async (e) => {
        e.preventDefault();
        setJoinError('');
        setJoinLoading(true);
        try {
            const res = await fetch('/api/groups/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inviteCode }),
            });
            const data = await res.json();
            if (!res.ok) { setJoinError(data.error || 'Failed to join group'); return; }
            setGroups((prev) => [data.group, ...prev]);
            setInviteCode('');
        } catch {
            setJoinError('Network error. Please try again.');
        } finally {
            setJoinLoading(false);
        }
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
                    <p style={{ color: 'var(--fb-text-secondary)', margin: 0 }}>Loading your groups…</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Quick Actions */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.25rem',
            }}>
                <Link href="/groups/create" style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: 'var(--fb-surface)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        boxShadow: 'var(--fb-shadow)',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--fb-surface2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--fb-surface)'}
                    >
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'var(--fb-blue)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', flexShrink: 0,
                        }}>
                            <PlusIcon />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9375rem', color: 'var(--fb-text)' }}>New Group</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--fb-text-muted)' }}>Create a space</p>
                        </div>
                    </div>
                </Link>

                <div
                    style={{
                        background: 'var(--fb-surface)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        boxShadow: 'var(--fb-shadow)',
                    }}
                >
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: '#42b72a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', flexShrink: 0,
                    }}>
                        <KeyIcon />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: '0 0 0.35rem', fontWeight: '700', fontSize: '0.9375rem', color: 'var(--fb-text)' }}>Join Group</p>
                        <form onSubmit={handleJoin} style={{ display: 'flex', gap: '0.4rem' }}>
                            <input
                                type="text"
                                placeholder="Invite code"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                style={{
                                    flex: 1,
                                    background: 'var(--fb-bg)',
                                    border: '1px solid var(--fb-border)',
                                    borderRadius: '6px',
                                    padding: '0.3rem 0.6rem',
                                    color: 'var(--fb-text)',
                                    fontSize: '0.8125rem',
                                    fontFamily: 'monospace',
                                    outline: 'none',
                                    minWidth: 0,
                                }}
                            />
                            <button type="submit" disabled={joinLoading || !inviteCode.trim()} style={{
                                background: 'var(--fb-blue)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.3rem 0.6rem',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                opacity: joinLoading || !inviteCode.trim() ? 0.5 : 1,
                            }}>
                                {joinLoading ? '…' : 'Join'}
                            </button>
                        </form>
                        {joinError && <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--fb-red)' }}>{joinError}</p>}
                    </div>
                </div>
            </div>

            {/* Groups Grid */}
            {groups.length === 0 ? (
                <div className="fb-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>👥</div>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: '700', color: 'var(--fb-text)' }}>
                        No groups yet
                    </h3>
                    <p style={{ margin: '0 0 1.25rem', color: 'var(--fb-text-secondary)', fontSize: '0.9375rem' }}>
                        Create a group or join one with an invite code.
                    </p>
                    <Link href="/groups/create" style={{
                        display: 'inline-block',
                        background: 'var(--fb-blue)',
                        color: '#fff',
                        fontWeight: '600',
                        padding: '0.625rem 1.5rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        transition: 'background 0.15s',
                    }}>
                        Create your first group
                    </Link>
                </div>
            ) : (
                <>
                    <h2 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: '700', color: 'var(--fb-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8125rem' }}>
                        Your Groups ({groups.length})
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '0.75rem',
                    }}>
                        {groups.map((group) => (
                            <GroupCard key={group._id} group={group} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}