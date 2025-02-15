'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export default function PHProvider({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init('phc_1UPki5xNs0OVIH9s9TouchaMmsmh6z4zPImKRvpbzac', {
        api_host: 'https://eu.i.posthog.com'
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
