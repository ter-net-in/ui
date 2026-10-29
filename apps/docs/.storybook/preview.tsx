import type { Preview } from '@storybook/react';
import type * as React from 'react';
import { useEffect } from 'react';

import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Light / dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === 'dark';

      useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
      }, [dark]);

      return (
        <div
          className={dark ? 'dark' : ''}
          style={
            {
              background: 'var(--color-background)',
              color: 'var(--color-foreground)',
              fontFamily: 'var(--font-sans)',
              padding: '2rem',
              minHeight: '100vh'
            } as React.CSSProperties
          }
        >
          <Story />
        </div>
      );
    }
  ]
};

export default preview;
