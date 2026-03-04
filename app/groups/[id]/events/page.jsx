// app/groups/[id]/events/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import CreateEventModal from '@/components/CreateEventModal';

export default function EventsPage() {
    const { user, loading } = useAuth();
    const { id: groupId } = useParams();
    const router = useRouter();

    const [events, setEvents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading]);

    useEffect(() => {
        if (!user || !groupId) return;
        fetchEvents();
    }, [user, groupId]);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`/api/events?groupId=${groupId}`);
            const data = await res.json();
            setEvents(data.events || []);
        } catch { }
        finally { setFetching(false); }
    };

    const handleRSVP = async (eventId, status) => {
        try {
            const res = await fetch(`/api/events/${eventId}/rsvp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (res.ok) {
                setEvents((prev) =>
                    prev.map((e) => e._id === eventId ? { ...e, rsvps: data.rsvps } : e)
                );
            }
        } catch { }
    };

    const formatDateTime = (dt) => {
        if (!dt) return null;
        return new Date(dt).toLocaleString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const getRSVPCounts = (rsvps) => ({
        going: rsvps?.filter((r) => r.status === 'going').length || 0,
        maybe: rsvps?.filter((r) => r.status === 'maybe').length || 0,
        not_going: rsvps?.filter((r) => r.status === 'not_going').length || 0,
    });

    const getUserRSVP = (rsvps) =>
        rsvps?.find((r) => r.userId?._id === user?.userId || r.userId?.toString() === user?.userId)?.status;

    if (loading || fetching) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{
                    width: '36px', height: '36px',
                    border: '3px solid var(--fb-blue)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

            {/* Header */}
            <div className="fb-card" style={{ marginBottom: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Link href={`/groups/${groupId}/chat`} style={{ color: 'var(--fb-text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
                    >
                        ← Back to Chat
                    </Link>
                    <h1 style={{ margin: '0.25rem 0 0.125rem', fontSize: '1.25rem', fontWeight: '800', color: 'var(--fb-text)' }}>Events</h1>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--fb-text-muted)' }}>From threads or created directly</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="btn-primary"
                    style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9375rem' }}
                >
                    + New Event
                </button>
            </div>

            {/* Events list */}
            {events.length === 0 ? (
                <div className="fb-card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>📅</div>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: '700', color: 'var(--fb-text)' }}>No events yet</h3>
                    <p style={{ margin: '0 0 1.5rem', color: 'var(--fb-text-secondary)' }}>Promote a chat thread to an event, or create one directly</p>
                    <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem' }}>
                        Create Event
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {events.map((event) => {
                        const counts = getRSVPCounts(event.rsvps);
                        const myRSVP = getUserRSVP(event.rsvps);

                        return (
                            <div key={event._id} className="fb-card" style={{ padding: '1rem' }}>
                                {/* Top row */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: 'var(--fb-text)' }}>{event.title}</h3>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                background: event.visibility === 'private' ? 'rgba(255,201,71,0.12)' : 'rgba(66,183,42,0.12)',
                                                color: event.visibility === 'private' ? '#ffc947' : 'var(--fb-green)',
                                                border: `1px solid ${event.visibility === 'private' ? 'rgba(255,201,71,0.25)' : 'rgba(66,183,42,0.25)'}`,
                                            }}>
                                                {event.visibility === 'private' ? '🔒 Private' : '🌐 Public'}
                                            </span>
                                            {event.sourceMessageId && (
                                                <span style={{
                                                    fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px',
                                                    background: 'rgba(24,119,242,0.12)', color: 'var(--fb-blue)',
                                                    border: '1px solid rgba(24,119,242,0.25)',
                                                }}>
                                                    💬 From thread
                                                </span>
                                            )}
                                        </div>
                                        {event.description && (
                                            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--fb-text-secondary)' }}>{event.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--fb-text-muted)', marginBottom: '0.875rem' }}>
                                    {event.dateTime && <span>🕐 {formatDateTime(event.dateTime)}</span>}
                                    {event.location && <span>📍 {event.location}</span>}
                                    <span>👤 {event.createdBy?.name}</span>
                                </div>

                                {/* RSVP counts */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem', marginBottom: '0.875rem' }}>
                                    <span style={{ color: 'var(--fb-green)', fontWeight: '600' }}>✓ {counts.going} going</span>
                                    <span style={{ color: '#ffc947', fontWeight: '600' }}>? {counts.maybe} maybe</span>
                                    <span style={{ color: 'var(--fb-red)', fontWeight: '600' }}>✗ {counts.not_going} not going</span>
                                </div>

                                {/* RSVP buttons */}
                                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--fb-border)', paddingTop: '0.75rem' }}>
                                    {[
                                        { status: 'going', label: '✓ Going', activeColor: 'var(--fb-green)', activeBg: 'rgba(66,183,42,0.15)' },
                                        { status: 'maybe', label: '? Maybe', activeColor: '#ffc947', activeBg: 'rgba(255,201,71,0.12)' },
                                        { status: 'not_going', label: "✗ Can't go", activeColor: 'var(--fb-red)', activeBg: 'rgba(240,40,73,0.12)' },
                                    ].map(({ status, label, activeColor, activeBg }) => {
                                        const isActive = myRSVP === status;
                                        return (
                                            <button
                                                key={status}
                                                onClick={() => handleRSVP(event._id, status)}
                                                className="fb-action-btn"
                                                style={{
                                                    color: isActive ? activeColor : 'var(--fb-text-secondary)',
                                                    background: isActive ? activeBg : 'transparent',
                                                    fontWeight: isActive ? '700' : '600',
                                                    fontSize: '0.875rem',
                                                    border: isActive ? `1px solid ${activeColor}` : '1px solid var(--fb-border)',
                                                    borderRadius: '8px',
                                                    flex: 1,
                                                }}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create event modal */}
            {showCreate && (
                <CreateEventModal
                    groupId={groupId}
                    onClose={() => setShowCreate(false)}
                    onCreated={(event) => {
                        setEvents((prev) => [event, ...prev]);
                        setShowCreate(false);
                    }}
                />
            )}
        </div>
    );
}