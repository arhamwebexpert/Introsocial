// app/groups/create/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

const BackIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

export default function CreateGroupPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const [form, setForm] = useState({ name: '', description: '', coverImage: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const res = await fetch('/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Failed to create group'); return; }
            router.push(`/groups/${data.group._id}`);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null;
    if (!user) { router.push('/login'); return null; }

    return (
        <div>
            {/* Back link */}
            <Link href="/dashboard" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                color: 'var(--fb-text-secondary)', textDecoration: 'none',
                fontSize: '0.9375rem', fontWeight: '500', marginBottom: '1rem',
                transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
            >
                <BackIcon /> Dashboard
            </Link>

            {/* Page title */}
            <div style={{ marginBottom: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: 'var(--fb-text)' }}>Create Group</h1>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--fb-text-secondary)', fontSize: '0.9375rem' }}>
                    A private space for your memories
                </p>
            </div>

            <div className="fb-card" style={{ padding: '1.25rem' }}>
                {error && (
                    <div style={{
                        background: 'rgba(240,40,73,0.12)',
                        border: '1px solid rgba(240,40,73,0.3)',
                        color: '#ff6b81',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9375rem', color: 'var(--fb-text)', marginBottom: '0.4rem' }}>
                            Group Name <span style={{ color: '#ff6b81' }}>*</span>
                        </label>
                        <input
                            className="fb-input"
                            name="name"
                            type="text"
                            placeholder="e.g. College Squad, Road Trip 2025"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9375rem', color: 'var(--fb-text)', marginBottom: '0.4rem' }}>
                            Description <span style={{ color: 'var(--fb-text-muted)', fontWeight: '400', fontSize: '0.875rem' }}>(optional)</span>
                        </label>
                        <textarea
                            className="fb-input"
                            name="description"
                            placeholder="What's this group about?"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9375rem', color: 'var(--fb-text)', marginBottom: '0.4rem' }}>
                            Cover Image URL <span style={{ color: 'var(--fb-text-muted)', fontWeight: '400', fontSize: '0.875rem' }}>(optional)</span>
                        </label>
                        <input
                            className="fb-input"
                            name="coverImage"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={form.coverImage}
                            onChange={handleChange}
                        />
                        {form.coverImage && (
                            <div style={{ marginTop: '0.5rem', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--fb-border)' }}>
                                <img src={form.coverImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div style={{
                        background: 'rgba(24,119,242,0.1)',
                        border: '1px solid rgba(24,119,242,0.25)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        marginBottom: '1.25rem',
                        fontSize: '0.875rem',
                        color: '#90b4f7',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                    }}>
                        <span>🔑</span>
                        <span>An invite code will be auto-generated. Share it with friends to let them join.</span>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary"
                        style={{ fontSize: '1rem', padding: '0.75rem' }}
                    >
                        {submitting ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg style={{ animation: 'spin 0.8s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                </svg>
                                Creating…
                            </span>
                        ) : 'Create Group'}
                    </button>
                </form>
            </div>
        </div>
    );
}