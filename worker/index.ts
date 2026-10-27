// Cloudflare Worker entry. Only /api/* requests reach this code
// (see run_worker_first in wrangler.jsonc); everything else is served
// straight from the static assets.

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Env {
  DB: D1Database;
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const MAX_BODY_BYTES = 5000;
const MAX_NAME = 80;
const MAX_COMMENT = 1000;

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers }
  });
}

async function listReviews(env: Env): Promise<Response> {
  const { results } = await env.DB
    .prepare('SELECT id, name, rating, comment, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT 50')
    .all<Review>();
  return json(results, 200, { 'Cache-Control': 'public, max-age=60' });
}

async function createReview(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Forbidden' }, 403);
  }

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    return json({ error: 'Review is too long' }, 413);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text);
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Hidden form field that real visitors never fill in; bots often do.
  // Pretend it worked so they do not retry.
  if (typeof data.website === 'string' && data.website !== '') {
    return json({ ok: true }, 201);
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const comment = typeof data.comment === 'string' ? data.comment.trim() : '';
  const rating = Number(data.rating);

  if (!name || name.length > MAX_NAME) {
    return json({ error: `Name is required (up to ${MAX_NAME} characters)` }, 400);
  }
  if (!comment || comment.length > MAX_COMMENT) {
    return json({ error: `Review is required (up to ${MAX_COMMENT} characters)` }, 400);
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return json({ error: 'Rating must be a whole number from 1 to 5' }, 400);
  }

  // Stored unapproved; it appears on the site once approved = 1.
  await env.DB
    .prepare('INSERT INTO reviews (name, rating, comment, approved) VALUES (?, ?, ?, 0)')
    .bind(name, rating, comment)
    .run();

  return json({ ok: true }, 201);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/reviews') {
      return url.pathname.startsWith('/api/')
        ? json({ error: 'Not found' }, 404)
        : env.ASSETS.fetch(request);
    }

    try {
      if (request.method === 'GET') {
        return await listReviews(env);
      }
      if (request.method === 'POST') {
        return await createReview(request, env);
      }
      return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST' });
    } catch (error) {
      console.error(error);
      return json({ error: 'Something went wrong' }, 500);
    }
  }
};
