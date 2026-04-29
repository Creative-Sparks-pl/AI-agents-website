import type { APIRoute } from 'astro';

export const prerender = false;

interface CapiBody {
  event_name?: string;
  event_id?: string;
  custom_data?: Record<string, unknown>;
  source_url?: string;
  test_event_code?: string;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
  const accessToken = import.meta.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return new Response(JSON.stringify({ ok: false, reason: 'not_configured' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: CapiBody;
  try {
    body = await request.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  if (!body.event_name || !body.event_id) {
    return new Response('missing event_name or event_id', { status: 400 });
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const fbp = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
  const fbc = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];
  const userAgent = request.headers.get('user-agent') ?? '';

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        action_source: 'website',
        event_source_url: body.source_url,
        user_data: {
          client_ip_address: clientAddress,
          client_user_agent: userAgent,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
        custom_data: body.custom_data ?? {},
      },
    ],
  };

  if (body.test_event_code) {
    payload.test_event_code = body.test_event_code;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[meta-capi] non-ok response:', response.status, errorText);
      return new Response('upstream error', { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[meta-capi] fetch failed:', err);
    return new Response('internal error', { status: 500 });
  }
};
