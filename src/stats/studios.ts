// studio stats
// * most watched studios by number of entries, time spent
// * highest rated studios by mean score

import { WatchlistDataRequest, WatchlistEndpointResponseData } from "../schema";

type Studio = {
  // studio ID in MAL
  id: number;

  // studio name
  name: string;

  // number of anime by this studio that the user has watched
  count?: number;

  // most popular anime by this studio
  anime?: WatchlistEndpointResponseData[];
};

export interface StudioStats {
  anime: any[] | null;
  mostWatched: Studio[] | null,
  highestRated: Studio[] | null,
  longestWatched: Studio[] | null,
  message?: string,
};

export async function getStudioStats(watchlist: WatchlistDataRequest): Promise<StudioStats> {
  const studioStats: StudioStats = {
    anime: null,
    mostWatched: null,
    highestRated: null,
    longestWatched: null,
  };

  const studioAnimeMapping = new Map<number, WatchlistEndpointResponseData[]>();

  const studios = watchlist.data.filter((item) =>
    item.list_status.num_episodes_watched > 0 &&
    !['plan_to_watch'].includes(item.list_status.status)
  ).map((item) => item.node.studios).flat();

  const studioCount = studios.reduce((acc: Record<number, number>, studio: Studio) => {
    acc[studio.id] = (acc[studio.id] || 0) + 1;

    return acc;
  }, {});

  const studioWatchData = Object.entries(studioCount).map(([id, count]) => {
    const studio = studios.find((studio) => studio.id === Number(id))!;

    let studioAnime = watchlist.data.filter((item) => item.node.studios.map((studio) => studio.id).includes(Number(id)));

    studioAnime.sort((a, b) => (a.node.mean > b.node.mean) ? -1 : 1);

    // remove anime that the user has not watched
    studioAnime = studioAnime.filter((item) => item.list_status.num_episodes_watched > 0);

    studioAnimeMapping.set(Number(id), studioAnime);

    return {
      id: studio.id,
      name: studio.name,
      count,
    };
  });

  studioStats.mostWatched = studioWatchData;
  studioStats.mostWatched.sort((a, b) => (a.count! > b.count!) ? -1 : 1);

  // studioStats.highestRated = studioWatchData;
  // // highest rated according to the user's list status
  // studioStats.highestRated.sort((a, b) => (a.anime![0].list_status.score > b.anime![0].list_status.score) ? -1 : 1);
  // // get the average user score for each studio
  // studioStats.highestRated = studioStats.highestRated.map((studio) => {
  //   const meanScore = studio.anime!.reduce((acc, anime) => acc + anime.list_status.score, 0) / studio.anime!.length;

  //   return {
  //     ...studio,
  //     meanScore,
  //   };
  // });
  
  studioStats.anime = Array.from(studioAnimeMapping.entries()).map(([id, anime]) => {
    const studio = studioStats.mostWatched!.find((studio) => studio.id === id)!;

    return {
      ...studio,
      anime,
    };
  });

  return studioStats;
}
