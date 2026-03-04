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
    const [summaries, setSummaries] = useState({});

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

    const formatDateTime = (dt) => {
        if (!dt) return null;
        return new Date(dt).toLocaleString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const handleJoinChat = (eventId) => {
        router.push(`/groups/${groupId}/chat`);
    };

    const handleSummarize = async (eventId) => {
        if (summaries[eventId]) {
            setSummaries((prev) => ({ ...prev, [eventId]: null }));
            return;
        }
        
        // Mock summary - in production, this would call an API
        const mockSummary = "This event discussion includes planning details, RSVP confirmations, and location updates. Members are excited and coordinating logistics.";
        setSummaries((prev) => ({ ...prev, [eventId]: mockSummary }));
    };

    const handleEndEvent = async (eventId) => {
        if (!confirm('Are you sure you want to end this event?')) return;
        
        try {
            // In production, this would call an API to delete/end the event
            setEvents((prev) => prev.filter((e) => e._id !== eventId));
            alert('Event ended successfully');
        } catch (error) {
            alert('Failed to end event');
        }
    };

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
            <div className="fb-card" style={{ marginBottom: '0.75rem', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                        href="/moments"
                        className="btn-secondary"
                        style={{ 
                            width: 'auto', 
                            padding: '0.5rem 1rem', 
                            fontSize: '0.9375rem',
                            textDecoration: 'none',
                            display: 'inline-block',
                        }}
                    >
                        📸 Moments
                    </Link>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="btn-primary"
                        style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9375rem' }}
                    >
                        + New Event
                    </button>
                </div>
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

                                {/* Join Chat & Summarize buttons */}
                                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--fb-border)', paddingTop: '0.75rem' }}>
                                    <button
                                        onClick={() => handleJoinChat(event._id)}
                                        className="fb-action-btn"
                                        style={{
                                            flex: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            padding: '0.5rem 1rem',
                                            background: 'var(--fb-blue)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--fb-blue-hover)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'var(--fb-blue)'}
                                    >
                                        💬 Join Chat
                                    </button>
                                    <button
                                        onClick={() => handleSummarize(event._id)}
                                        className="fb-action-btn"
                                        style={{
                                            flex: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            padding: '0.5rem 1rem',
                                            background: summaries[event._id] ? 'var(--fb-surface3)' : 'var(--fb-surface2)',
                                            color: 'var(--fb-text-secondary)',
                                            border: '1px solid var(--fb-border)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s, color 0.15s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--fb-surface3)'; e.currentTarget.style.color = 'var(--fb-text)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = summaries[event._id] ? 'var(--fb-surface3)' : 'var(--fb-surface2)'; e.currentTarget.style.color = 'var(--fb-text-secondary)'; }}
                                    >
                                        📝 {summaries[event._id] ? 'Hide Summary' : 'Summarize'}
                                    </button>
                                    <button
                                        onClick={() => handleEndEvent(event._id)}
                                        className="fb-action-btn"
                                        style={{
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            padding: '0.5rem 1rem',
                                            background: 'var(--fb-surface2)',
                                            color: 'var(--fb-red)',
                                            border: '1px solid var(--fb-border)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s, color 0.15s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--fb-red)'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--fb-surface2)'; e.currentTarget.style.color = 'var(--fb-red)'; }}
                                    >
                                        🔚 End Event
                                    </button>
                                </div>

                                {/* Summary display */}
                                {summaries[event._id] && (
                                    <div style={{
                                        marginTop: '0.75rem',
                                        padding: '0.875rem',
                                        background: 'var(--fb-surface2)',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid var(--fb-blue)',
                                    }}>
                                        <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--fb-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Summary
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--fb-text)', lineHeight: '1.5' }}>
                                            {summaries[event._id]}
                                        </p>
                                    </div>
                                )}
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