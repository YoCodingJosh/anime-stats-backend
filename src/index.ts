import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';

import { Bindings } from './_utils';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors()); // TODO: Add origin allowlist
app.use('*', poweredBy());
app.use('*', prettyJSON());

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Yo!'));

app.get('/health', async (c) => {
  console.log(c.env.MAL_CLIENT_ID);

  const response = await fetch('https://api.myanimelist.net/v2/anime/21273',
    { headers: { 'X-MAL-CLIENT-ID': c.env.MAL_CLIENT_ID } }
  );

  if (response.ok) {
    return c.json({ ok: true, services: ['mal']});
  } else {
    return new Response('MyAnimeList is unavailable', { status: response.status });
  }
});

export default app;
