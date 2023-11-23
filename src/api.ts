import { Context, Hono } from 'hono';

const app = new Hono();

const malFetch = async (url: string, c: Context) => {
  const response = await fetch(url, { headers: { 'X-MAL-CLIENT-ID': c.env.MAL_CLIENT_ID } });

  if (response.ok) {
    return await response.json();
  } else {
    return new Response('MyAnimeList is unavailable', { status: response.status });
  }
};

app.get('/:username', async (c) => {
  const username = c.req.param('username');

  // MAL's API is still kinda dumb:
  // you can get the user's anime list by username anonymously, but you have to OAuth to get their profile info.
  // so we'll just use jikan.moe's API instead.
  const response = await (await fetch(`https://api.jikan.moe/v4/users/${username}`)).json();
  return c.json(response, 200);
});

app.get('/:username/raw-stats', (c) => c.json("gets the user's raw stats", 200));
app.post('/:username/crunch', (c) => c.json(`crunch ${c.req.param('username')}'s stats`, 200));

export default app;
