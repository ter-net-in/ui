import type { Metadata } from 'next';
import type * as React from 'react';

import '@/theme/globals.css';
import './docs.css';

export const metadata: Metadata = {
  title: 'internet-ui',
  description: 'A place on the internet for components. Base UI + Tailwind, copy-paste via CLI.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grid-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
