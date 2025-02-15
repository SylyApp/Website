'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export default function PHProvider({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: 'https://eu.i.posthog.com'
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
