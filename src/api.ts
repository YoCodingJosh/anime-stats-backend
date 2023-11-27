import { Context, Hono } from 'hono';
import { JikanErrorResponse, JikanUserResponse, WatchlistEndpointResponse } from './schema';

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
  const response = await (await fetch(`https://api.jikan.moe/v4/users/${username}`)).json() as JikanUserResponse | JikanErrorResponse;

  if ('error' in response) {
    if (response.status === 404) {
      return c.json({ message: 'User not found', ok: false }, 404);
    } else {
      return c.json({ message: response.message, ok: false }, 500);
    }
  }

  return c.json(response, 200);
});

app.get('/:username/raw-data', async (c) => {
  const username = c.req.param('username');

  const url = `https://api.myanimelist.net/v2/users/${username}/animelist?fields=id,title,main_picture,
  start_date,end_date,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,updated_at,media_type,
  status,genres,my_list_status,num_episodes,start_season,source,average_episode_duration,rating,pictures,
  related_anime,studios,statistics&limit=1000&nsfw=true`;

  const response = await malFetch<WatchlistEndpointResponse>(url, c);

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
