// studio stats
// * most watched studios by number of entries, time spent
// * highest rated studios by mean score

import { WatchlistDataRequest, WatchlistEndpointResponseData } from "../schema";

type Studio = {
  id: number;
  name: string;
  anime?: WatchlistEndpointResponseData[];
};

export interface StudioStats {
  mostWatched: WatchlistEndpointResponseData[] | null,
  highestRated: WatchlistEndpointResponseData[] | null,
  message?: string,
};

export function getStudioStats(watchlist: WatchlistDataRequest): StudioStats {
  const studioStats: StudioStats = {
    mostWatched: null,
    highestRated: null,
  };

  const studios = watchlist.data.filter((item) =>
    item.list_status.num_episodes_watched > 0 &&
    !['plan_to_watch'].includes(item.list_status.status)
  ).map((item) => item.node.studios).flat();

  const studioCount = studios.reduce((acc: Record<string, number>, studio: Studio) => {
    acc[studio.name] = (acc[studio.name] || 0) + 1;

    return acc;
  }, {});

  // dedupe the studios
  const uniqueStudios = studios.filter((studio, index) => studios.findIndex((s) => s.id === studio.id) === index);

  return studioStats;
}
