// app/layout.js
import "./globals.css";
import { AuthProvider } from "@/lib/useAuth";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Introsocial",
  description: "Private memories for your people",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          {/* Main content area — padded for the fixed top navbar (56px) and mobile bottom bar (56px) */}
          <main
            style={{
              paddingTop: '56px',
              paddingBottom: '0',
              minHeight: '100vh',
              background: 'var(--fb-bg)',
            }}
          >
            <div
              style={{
                maxWidth: '680px',
                margin: '0 auto',
                padding: '1rem 0.75rem',
              }}
              className="fb-main-content"
            >
              {children}
            </div>
          </main>
          {/* Spacer for mobile bottom nav */}
          <div className="mobile-bottom-spacer" />
        </AuthProvider>
      </body>
    </html>
  );
}
