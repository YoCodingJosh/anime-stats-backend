import { Context, Hono } from 'hono';
import { WatchlistEndpointResponse } from './schema';

const app = new Hono();

const malFetch = async <T>(url: string, c: Context) => {
  const response = await fetch(url, { headers: { 'X-MAL-CLIENT-ID': c.env.MAL_CLIENT_ID } });

  if (response.ok) {
    return await response.json<T>();
  } else {
    throw new Error(`MyAnimeList returned ${response.status}`);
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

app.get('/:username/raw-data', async (c) => {
  const username = c.req.param('username');

  const response = await malFetch<WatchlistEndpointResponse>(`https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status&limit=1000&nsfw=true`, c);

  const watchlistData: WatchlistEndpointResponse[] = [response];

  while (watchlistData[watchlistData.length - 1].paging.next) {
    const nextResponse = await malFetch<WatchlistEndpointResponse>(watchlistData[watchlistData.length - 1].paging.next!, c);

    watchlistData.push(nextResponse);
  }

  const watchlist = watchlistData.flatMap((d) => d.data);

  return c.json(watchlist, 200);
});

app.post('/:username/crunch', (c) => c.json(`crunch ${c.req.param('username')}'s stats`, 200));

export default app;
