// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

export default function LoginPage() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Login failed'); return; }
            setUser(data.user);
            router.push('/dashboard');
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
        }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '60px', height: '60px',
                        background: 'var(--fb-blue)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.875rem', fontWeight: '900', color: '#fff',
                        fontStyle: 'italic', margin: '0 auto 1rem',
                    }}>i</div>
                    <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: 'var(--fb-text)' }}>
                        Introsocial
                    </h1>
                    <p style={{ margin: '0.375rem 0 0', color: 'var(--fb-text-secondary)', fontSize: '0.9375rem' }}>
                        Connect with the people who matter most.
                    </p>
                </div>

                {/* Card */}
                <div className="fb-card" style={{ padding: '1.5rem' }}>
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
                        <div style={{ marginBottom: '0.875rem' }}>
                            <input
                                className="fb-input"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                className="fb-input"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ fontSize: '1.0625rem', padding: '0.75rem' }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <svg style={{ animation: 'spin 0.8s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                    </svg>
                                    Signing in…
                                </span>
                            ) : 'Log In'}
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', gap: '0.75rem' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--fb-border)' }} />
                        <span style={{ color: 'var(--fb-text-muted)', fontSize: '0.875rem', fontWeight: '600' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--fb-border)' }} />
                    </div>

                    <Link href="/signup" style={{ display: 'block', textDecoration: 'none' }}>
                        <button style={{
                            width: '100%',
                            background: '#42b72a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.7rem',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                            fontFamily: 'inherit',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#36a420'}
                            onMouseLeave={e => e.currentTarget.style.background = '#42b72a'}
                        >
                            Create new account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}