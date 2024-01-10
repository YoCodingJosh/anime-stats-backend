import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';

import api from './api';

import { Bindings } from './schema';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors()); // TODO: Add origin allowlist
app.use('*', csrf());
app.use('*', poweredBy());
app.use('*', prettyJSON());

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.get('/', (c) => c.text('Yo!'));

app.get('/health', async (c) => {
  const response = await fetch('https://api.myanimelist.net/v2/anime/21273',
    { headers: { 'X-MAL-CLIENT-ID': c.env.MAL_CLIENT_ID } }
  );

  if (response.ok) {
    return c.json({ ok: true, services: ['mal'] });
  } else {
    // I know that I should return a 503 (or whatever MAL sends us), but I don't want to signal to the frontend that the service is unavailable
    return c.json({ ok: false, services: [], message: `MAL is unavailable: ${response.status}` });
  }
});

app.route('/api', api);

export default app;
