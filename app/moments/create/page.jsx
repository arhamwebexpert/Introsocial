// app/moments/create/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

const BackIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const CameraIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);

export default function CreateMomentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();

    const groupId = searchParams.get('groupId');

    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [preview, setPreview] = useState('');
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (!loading && !groupId) router.push('/dashboard');
    }, [user, loading, groupId]);

    const handleFileChange = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
        setImageUrl('');
    };

    const uploadImage = async () => {
        if (!imageFile) return imageUrl;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            return data.url;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!imageFile && !imageUrl) {
            setError('Please select a photo or enter an image URL.');
            return;
        }
        setSubmitting(true);
        try {
            const finalUrl = await uploadImage();
            const res = await fetch('/api/moments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: finalUrl, caption, groupId }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Failed to post moment'); return; }
            router.push(`/groups/${groupId}`);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null;

    const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

    return (
        <div>
            {/* Back link */}
            <Link href={groupId ? `/groups/${groupId}` : '/dashboard'} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                color: 'var(--fb-text-secondary)', textDecoration: 'none',
                fontSize: '0.9375rem', fontWeight: '500', marginBottom: '1rem',
                transition: 'color 0.15s',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--fb-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fb-text-secondary)'}
            >
                <BackIcon /> Back to group
            </Link>

            <div className="fb-card">
                {/* Card header */}
                <div style={{
                    padding: '1rem 1rem 0.75rem',
                    borderBottom: '1px solid var(--fb-border)',
                    textAlign: 'center',
                }}>
                    <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700', color: 'var(--fb-text)' }}>
                        Create Post
                    </h1>
                </div>

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1rem 0' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--fb-blue)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.9375rem', fontWeight: '700', color: '#fff', flexShrink: 0,
                    }}>
                        {initials}
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9375rem', color: 'var(--fb-text)' }}>
                            {user?.name}
                        </p>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            background: 'var(--fb-surface2)', borderRadius: '6px',
                            padding: '1px 8px', fontSize: '0.75rem', color: 'var(--fb-text-secondary)',
                            fontWeight: '600', marginTop: '2px',
                        }}>
                            🌍 Private Group
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '0.75rem 1rem 1rem' }}>
                    {error && (
                        <div style={{
                            background: 'rgba(240,40,73,0.12)',
                            border: '1px solid rgba(240,40,73,0.3)',
                            color: '#ff6b81',
                            borderRadius: '8px',
                            padding: '0.625rem 0.875rem',
                            marginBottom: '0.75rem',
                            fontSize: '0.875rem',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Caption textarea */}
                    <textarea
                        placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || ''}?`}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows={3}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--fb-text)',
                            fontSize: '1.125rem',
                            resize: 'none',
                            fontFamily: 'inherit',
                            marginBottom: '0.75rem',
                            lineHeight: '1.5',
                        }}
                    />

                    {/* Image Upload */}
                    <div
                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={e => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
                        style={{
                            border: `2px dashed ${isDragging ? 'var(--fb-blue)' : 'var(--fb-border)'}`,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s, background 0.15s',
                            background: isDragging ? 'rgba(24,119,242,0.08)' : 'var(--fb-surface2)',
                            marginBottom: '0.875rem',
                            position: 'relative',
                        }}
                    >
                        <label style={{ cursor: 'pointer', display: 'block' }}>
                            {preview ? (
                                <img src={preview} alt="Preview" style={{
                                    width: '100%', maxHeight: '320px',
                                    objectFit: 'cover', display: 'block',
                                }} />
                            ) : (
                                <div style={{
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    padding: '2rem 1rem', gap: '0.5rem',
                                }}>
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '50%',
                                        background: 'var(--fb-surface3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--fb-text-secondary)', marginBottom: '0.25rem',
                                    }}>
                                        <CameraIcon />
                                    </div>
                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem', color: 'var(--fb-text)' }}>
                                        Add Photos
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--fb-text-muted)' }}>
                                        or drag and drop
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleFileChange(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </label>

                        {preview && (
                            <label style={{
                                position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                                background: 'rgba(0,0,0,0.7)', color: '#fff',
                                padding: '0.3rem 0.75rem', borderRadius: '20px',
                                fontSize: '0.8125rem', fontWeight: '600',
                                cursor: 'pointer', backdropFilter: 'blur(4px)',
                            }}>
                                Change
                                <input type="file" accept="image/*" onChange={e => handleFileChange(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                        )}
                    </div>

                    {/* Or paste URL */}
                    {!imageFile && (
                        <div style={{ marginBottom: '0.875rem' }}>
                            <input
                                className="fb-input"
                                type="url"
                                placeholder="Or paste an image URL…"
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                    setPreview(e.target.value);
                                }}
                                style={{ fontSize: '0.875rem', padding: '0.6rem 0.875rem' }}
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting || uploading}
                        className="btn-primary"
                        style={{ fontSize: '1rem', padding: '0.75rem' }}
                    >
                        {uploading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg style={{ animation: 'spin 0.8s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                </svg>
                                Uploading photo…
                            </span>
                        ) : submitting ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <svg style={{ animation: 'spin 0.8s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                                </svg>
                                Posting…
                            </span>
                        ) : 'Post'}
                    </button>
                </form>
            </div>
        </div>
    );
}