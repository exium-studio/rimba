"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useMemo } from "react";

interface EmotionProviderProps {
  nonce: string;
  children: React.ReactNode;
}

/**
 * Wraps children with an emotion CacheProvider configured with a per-request
 * nonce. This allows emotion (used internally by Chakra UI v3) to inject
 * <style nonce="..."> tags that satisfy the CSP `style-src 'nonce-...'`
 * directive, eliminating the need for `unsafe-inline`.
 */
export function EmotionProvider({ nonce, children }: EmotionProviderProps) {
  const cache = useMemo(
    () =>
      createCache({
        key: "css",
        nonce,
        // Prepend so Chakra styles land before user overrides
        prepend: true,
      }),
    // nonce is constant per page-load — recreating on nonce change is safe
    [nonce],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
