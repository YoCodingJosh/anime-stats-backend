// studio stats
// * most watched studios by number of entries, time spent
// * highest rated studios by mean score

import { WatchlistDataRequest, WatchlistEndpointResponseData } from "../schema";

type StudioData = {
  // ID of the studio
  id: number;

  // Name of the studio
  name: string;

  // Number of anime watched from this studio
  anime: WatchlistEndpointResponseData[];

  // Total time spent watching anime from this studio
  watchTime: number;
}

export async function getStudioStats(watchlist: WatchlistDataRequest): Promise<Record<number, StudioData>> {
  return watchlist.data.filter((item) =>
    item.list_status.num_episodes_watched > 0 &&
    !['plan_to_watch'].includes(item.list_status.status)
  ).reduce((acc: Record<number, StudioData>, item) => {
    item.node.studios.forEach((studio) => {
      if (!acc[studio.id]) {
        acc[studio.id] = { id: studio.id, name: studio.name, anime: [], watchTime: 0 };
      }
      acc[studio.id].anime.push(item);
      acc[studio.id].watchTime += item.list_status.num_episodes_watched * item.node.average_episode_duration;
    });
    return acc;
  }, {});
}
