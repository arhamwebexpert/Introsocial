// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

// SVG icons
const HomeIcon = ({ filled }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
);

const GroupsIcon = ({ filled }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? '0' : '2'} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M1 20c0-3.3 3.1-6 8-6s8 2.7 8 6" />
        <path d="M16 14c2.7.6 5 2.6 5 5.5" strokeWidth="2" />
    </svg>
);

const PlusIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();

    const isHome = pathname === '/dashboard';
    const isGroups = pathname?.startsWith('/groups');

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    return (
        <>
            {/* ── Top Bar ── */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '56px',
                background: 'var(--fb-surface)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
                zIndex: 1000,
            }}>
                {/* Left: Logo */}
                <Link href="/dashboard" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'var(--fb-blue)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: '900',
                        color: '#fff',
                        fontStyle: 'italic',
                        letterSpacing: '-1px',
                    }}>i</div>
                    <span style={{
                        fontSize: '1.375rem',
                        fontWeight: '800',
                        color: 'var(--fb-blue)',
                        display: 'none',
                    }} className="navbar-brand-text">
                        introsocial
                    </span>
                </Link>

                {/* Center: Nav Tabs (desktop) */}
                {!loading && user && (
                    <div style={{
                        display: 'flex',
                        gap: '0.25rem',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }} className="navbar-tabs">
                        <Link href="/dashboard" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '112px',
                            height: '44px',
                            borderRadius: 'var(--fb-radius)',
                            color: isHome ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                            background: 'transparent',
                            textDecoration: 'none',
                            borderBottom: isHome ? '3px solid var(--fb-blue)' : '3px solid transparent',
                            transition: 'background 0.15s, color 0.15s',
                        }}
                            onMouseEnter={e => { if (!isHome) e.currentTarget.style.background = 'var(--fb-hover)'; }}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <HomeIcon filled={isHome} />
                        </Link>
                        <Link href="/groups/create" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '112px',
                            height: '44px',
                            borderRadius: 'var(--fb-radius)',
                            color: isGroups ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                            background: 'transparent',
                            textDecoration: 'none',
                            borderBottom: isGroups ? '3px solid var(--fb-blue)' : '3px solid transparent',
                            transition: 'background 0.15s, color 0.15s',
                        }}
                            onMouseEnter={e => { if (!isGroups) e.currentTarget.style.background = 'var(--fb-hover)'; }}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <GroupsIcon filled={isGroups} />
                        </Link>
                    </div>
                )}

                {/* Right: User controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {!loading && (
                        user ? (
                            <>
                                {/* User avatar */}
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'var(--fb-blue)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    color: '#fff',
                                    cursor: 'default',
                                    userSelect: 'none',
                                }}>
                                    {initials}
                                </div>
                                {/* Logout button */}
                                <button
                                    onClick={logout}
                                    title="Sign out"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'var(--fb-surface2)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--fb-text-secondary)',
                                        transition: 'background 0.15s, color 0.15s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#f02849'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--fb-surface2)'; e.currentTarget.style.color = 'var(--fb-text-secondary)'; }}
                                >
                                    <LogoutIcon />
                                </button>
                            </>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link href="/login" style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: 'var(--fb-radius)',
                                    color: 'var(--fb-text-secondary)',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '0.9375rem',
                                    transition: 'background 0.15s',
                                }}>
                                    Log In
                                </Link>
                                <Link href="/signup" style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: 'var(--fb-radius)',
                                    background: 'var(--fb-blue)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '0.9375rem',
                                    transition: 'background 0.15s',
                                }}>
                                    Sign Up
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </nav>

            {/* ── Mobile Bottom Tab Bar ── */}
            {!loading && user && (
                <nav className="mobile-bottom-nav" style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '56px',
                    background: 'var(--fb-surface)',
                    boxShadow: '0 -1px 0 var(--fb-border)',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    zIndex: 1000,
                    padding: '0 0.5rem',
                }}>
                    <Link href="/dashboard" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        height: '100%',
                        color: isHome ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                        textDecoration: 'none',
                        padding: '0.25rem',
                        borderTop: isHome ? '2px solid var(--fb-blue)' : '2px solid transparent',
                    }}>
                        <HomeIcon filled={isHome} />
                    </Link>

                    <Link href="/groups/create" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        height: '100%',
                        color: isGroups ? 'var(--fb-blue)' : 'var(--fb-text-secondary)',
                        textDecoration: 'none',
                        padding: '0.25rem',
                        borderTop: isGroups ? '2px solid var(--fb-blue)' : '2px solid transparent',
                    }}>
                        <GroupsIcon filled={isGroups} />
                    </Link>

                    {/* Quick post */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'var(--fb-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                        }}>
                            <PlusIcon />
                        </div>
                    </div>

                    {/* User avatar */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--fb-blue)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            color: '#fff',
                        }}>
                            {initials}
                        </div>
                    </div>

                    {/* Logout */}
                    <button onClick={logout} style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--fb-text-secondary)',
                        borderTop: '2px solid transparent',
                    }}>
                        <LogoutIcon />
                    </button>
                </nav>
            )}

            {/* Media query styles injected as a style tag */}
            <style>{`
                @media (min-width: 600px) {
                    .navbar-brand-text { display: inline !important; }
                    .mobile-bottom-nav { display: none !important; }
                }
                @media (max-width: 599px) {
                    .navbar-tabs { display: none !important; }
                    .mobile-bottom-nav { display: flex !important; }
                    .fb-main-content {
                        padding-bottom: 4.5rem !important;
                    }
                }
            `}</style>
        </>
    );
}