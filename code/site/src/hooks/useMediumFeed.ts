import { useEffect, useState } from "react";
import { publications, type Publication } from "@/data/publications";

/**
 * Optional live Medium feed.
 *
 * Medium exposes an RSS feed at https://medium.com/feed/@username but CORS
 * blocks a direct client-side fetch. The clean path is to proxy it through a
 * small Lambda that returns parsed JSON with the same `Publication` shape.
 *
 * Set VITE_MEDIUM_FEED_URL in your .env to your Lambda Function URL and this
 * hook will use it. Otherwise it returns the curated `publications` array so
 * the site keeps working.
 *
 * Lambda implementation guide:
 *   infrastructure/lambda/medium-feed-proxy.md
 */
export function useMediumFeed(): {
  items: Publication[];
  loading: boolean;
  error: string | null;
} {
  const [items, setItems] = useState<Publication[]>(publications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const feedUrl = import.meta.env?.VITE_MEDIUM_FEED_URL as string | undefined;
    if (!feedUrl) return; // Stay with curated fallback.

    let cancelled = false;
    setLoading(true);

    fetch(feedUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Feed proxy returned ${res.status}`);
        return res.json();
      })
      .then((data: Publication[]) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
        // Silent fallback — we keep `publications` so the UI doesn't break.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
