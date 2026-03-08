'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isInGroup = pathname?.match(/^\/groups\/[^/]+$/) || pathname?.match(/^\/groups\/[^/]+\/(chat|events|moments)/);

    return (
        <>
            {!isInGroup && <Navbar />}
            <main
                style={{
                    paddingTop: isInGroup ? '0' : '56px',
                    paddingBottom: '0',
                    minHeight: '100vh',
                    background: 'var(--fb-bg)',
                }}
            >
                <div
                    style={{
                        maxWidth: isInGroup ? '1300px' : '680px',
                        margin: '0 auto',
                        padding: isInGroup ? '0' : '1rem 0.75rem',
                        height: isInGroup ? '100vh' : 'auto',
                    }}
                    className={isInGroup ? '' : 'fb-main-content'}
                >
                    {children}
                </div>
            </main>
            {!isInGroup && <div className="mobile-bottom-spacer" />}
        </>
    );
}
