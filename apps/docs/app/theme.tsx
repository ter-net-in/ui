'use client';

import * as React from 'react';
import { Button } from '@/ui/button';

const ThemeContext = React.createContext({ dark: false, toggle: () => {} });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('ter-theme');
      setDark(stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch {
      setDark(false);
    }
  }, []);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  function toggle() {
    setDark((current) => {
      try {
        localStorage.setItem('ter-theme', current ? 'light' : 'dark');
      } catch {
        /* Theme remains usable without storage. */
      }
      return !current;
    });
  }
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => React.useContext(ThemeContext);
export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <Button variant="ghost" size="sm" onClick={toggle}>
      {dark ? 'Light theme' : 'Dark theme'}
    </Button>
  );
}
