import type { Metadata } from 'next';
import type * as React from 'react';

import '@/theme/globals.css';
import { ThemeProvider } from './theme';

export const metadata: Metadata = {
  title: 'ui.ter.net.in',
  description: 'internet-ui component library and Storybook.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
