// components/PromoteEventModal.jsx
'use client';

import { useState } from 'react';

export default function PromoteEventModal({ message, groupId, onClose, onPromoted }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '',
        visibility: 'public',
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) { setError('Title is required'); return; }
        setSubmitting(true);
        try {
            const res = await fetch(`/api/messages/${message._id}/promote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Failed'); return; }
            onPromoted(data.event);
        } catch {
            setError('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1100, padding: '1rem',
        }}>
            <div className="fb-card" style={{ width: '100%', maxWidth: '440px', background: 'var(--fb-surface)' }}>
                <div style={{ padding: '1.25rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--fb-border)' }}>
                        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: 'var(--fb-text)' }}>📅 Promote to Event</h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'var(--fb-surface2)', border: 'none', borderRadius: '50%',
                                width: '32px', height: '32px', cursor: 'pointer',
                                color: 'var(--fb-text-secondary)', fontSize: '1.25rem', lineHeight: 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--fb-surface3)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--fb-surface2)'}
                        >
                            ×
                        </button>
                    </div>

                    {/* Source message preview */}
                    <div style={{
                        background: 'var(--fb-surface2)',
                        borderLeft: '3px solid var(--fb-blue)',
                        borderRadius: '0 8px 8px 0',
                        padding: '0.625rem 0.875rem',
                        marginBottom: '1.25rem',
                        fontSize: '0.9375rem',
                        color: 'var(--fb-text-secondary)',
                        fontStyle: 'italic',
                    }}>
                        "{message.text}"
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(240,40,73,0.12)', border: '1px solid rgba(240,40,73,0.3)',
                            color: 'var(--fb-red)', borderRadius: '8px', padding: '0.5rem 0.875rem',
                            marginBottom: '1rem', fontSize: '0.875rem',
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '0.875rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)', marginBottom: '0.375rem' }}>Event Title *</label>
                            <input name="title" type="text" placeholder="e.g. Friday Night Hangout"
                                value={form.title} onChange={handleChange} required
                                className="fb-input" />
                        </div>

                        <div style={{ marginBottom: '0.875rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)', marginBottom: '0.375rem' }}>Description</label>
                            <textarea name="description" placeholder="Details about the event..." rows={2}
                                value={form.description} onChange={handleChange}
                                className="fb-input"
                                style={{ resize: 'none', height: 'auto' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.875rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)', marginBottom: '0.375rem' }}>Date &amp; Time</label>
                                <input name="dateTime" type="datetime-local"
                                    value={form.dateTime} onChange={handleChange}
                                    className="fb-input" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)', marginBottom: '0.375rem' }}>Location</label>
                                <input name="location" type="text" placeholder="Where?"
                                    value={form.location} onChange={handleChange}
                                    className="fb-input" />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--fb-text-secondary)', marginBottom: '0.375rem' }}>Visibility</label>
                            <select name="visibility" value={form.visibility} onChange={handleChange}
                                className="fb-input" style={{ cursor: 'pointer' }}>
                                <option value="public">🌐 Public — all group members</option>
                                <option value="private">🔒 Private — invite only</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '0.625rem' }}>
                            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                                Cancel
                            </button>
                            <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 1 }}>
                                {submitting ? 'Creating…' : 'Create Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}