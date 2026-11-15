import type { APIRoute } from 'astro';
import { getShownDownloads } from '../lib/free-skill-downloads';

// The number the pages show and where it came from, published so the next build can fall back
// to it and the release can check its source. No raw count.
export const prerender = true;

export const GET: APIRoute = async () => {
  const { shown, source } = await getShownDownloads();
  return new Response(JSON.stringify({ shown, source }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
