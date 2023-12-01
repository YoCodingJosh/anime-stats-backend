import { Context, Hono } from "hono";
import {
  JikanErrorResponse,
  JikanUserResponse,
  WatchlistDataRequest,
  WatchlistEndpointResponse,
} from "./schema";
import { runDefaultStats, availableStats } from "./stats";

const app = new Hono();

const malFetch = async <T>(url: string, c: Context) => {
  const response = await fetch(url, {
    headers: { "X-MAL-CLIENT-ID": c.env.MAL_CLIENT_ID },
  });

  if (response.ok) {
    return await response.json<T>();
  } else {
    throw new Error(`MyAnimeList returned ${response.status}`);
  }
};

app.get("/:username", async (c) => {
  const username = c.req.param("username");

  // MAL's API is still kinda dumb:
  // you can get the user's anime list by username anonymously, but you have to OAuth to get their profile info.
  // so we'll just use jikan.moe's API instead.
  const response = (await (
    await fetch(`https://api.jikan.moe/v4/users/${username}`)
  ).json()) as JikanUserResponse | JikanErrorResponse;

  if ("error" in response) {
    if (response.status === 404) {
      return c.json({ message: "User not found", ok: false }, 404);
    } else {
      return c.json({ message: response.message, ok: false }, 500);
    }
  }

  return c.json(response, 200);
});

app.get("/:username/raw-data", async (c) => {
  const username = c.req.param("username");

  // Get's the user's anime list along with extensive details about each anime.
  const url = `https://api.myanimelist.net/v2/users/${username}/animelist?fields=id,title,main_picture,start_date,
  end_date,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,
  list_status,num_episodes,start_season,source,average_episode_duration,rating,pictures,related_anime,studios,statistics
  &limit=1000&nsfw=true`;

  const response = await malFetch<WatchlistEndpointResponse>(url, c);

  const watchlistData: WatchlistEndpointResponse[] = [response];

  while (watchlistData[watchlistData.length - 1].paging.next) {
    const nextResponse = await malFetch<WatchlistEndpointResponse>(
      watchlistData[watchlistData.length - 1].paging.next!,
      c
    );

    watchlistData.push(nextResponse);
  }

  const watchlist = watchlistData.flatMap((d) => d.data);

  return c.json(watchlist, 200);
});

app.post("/:username/stats", async (c) => {
  const watchlist: WatchlistDataRequest = {
    data: await c.req.json(),
  };

  const stats = runDefaultStats(watchlist);

  return c.json(
    {
      stats,
      availableStats: availableStats.map((stat) => stat.id),
    },
    200
  );
});

app.post("/:username/stats/:id", async (c) => {
  const watchlist: WatchlistDataRequest = {
    data: await c.req.json(),
  };

  return c.json(`get ${c.req.param("username")}'s stats`, 200);
});

export default app;
