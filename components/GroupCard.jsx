// components/GroupCard.jsx
import Link from 'next/link';

export default function GroupCard({ group }) {
    const initials = group.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const memberCount = group.members?.length || 0;

    return (
        <Link href={`/groups/${group._id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="fb-card group-card" style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
                background: 'var(--fb-surface)',
                borderRadius: '12px',
                overflow: 'hidden',
            }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--fb-shadow)';
                }}
            >
                {/* Cover Image / Gradient */}
                <div style={{
                    height: '140px',
                    background: 'linear-gradient(135deg, #1c2d5a 0%, #1877f2 50%, #0d3b8e 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {group.coverImage ? (
                        <img
                            src={group.coverImage}
                            alt={group.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <span style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                color: 'rgba(255,255,255,0.25)',
                                letterSpacing: '-2px',
                            }}>
                                {initials}
                            </span>
                        </div>
                    )}

                    {/* Member count badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '20px',
                        padding: '3px 10px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#fff',
                        backdropFilter: 'blur(4px)',
                    }}>
                        👥 {memberCount}
                    </div>
                </div>

                {/* Info */}
                <div style={{ padding: '0.875rem 1rem 1rem' }}>
                    <h3 style={{
                        margin: '0 0 0.25rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: 'var(--fb-text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {group.name}
                    </h3>

                    {group.description && (
                        <p style={{
                            margin: '0 0 0.75rem',
                            fontSize: '0.8125rem',
                            color: 'var(--fb-text-secondary)',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.4',
                        }}>
                            {group.description}
                        </p>
                    )}

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid var(--fb-border)',
                        paddingTop: '0.625rem',
                        marginTop: group.description ? 0 : '0.5rem',
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--fb-text-muted)',
                            fontFamily: 'monospace',
                            background: 'var(--fb-bg)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                        }}>
                            {group.inviteCode}
                        </span>
                        <span style={{
                            fontSize: '0.8125rem',
                            fontWeight: '600',
                            color: 'var(--fb-blue)',
                        }}>
                            View →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}