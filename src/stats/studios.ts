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

  // Average score of anime from this studio
  averageScore?: number;

  // Total score of anime from this studio
  totalScore?: number; // this is only used when calculating the average score and is deleted afterwards
}

export async function getStudioStats(watchlist: WatchlistDataRequest): Promise<Record<number, StudioData>> {
  const rawStudioData = watchlist.data.reduce((acc: Record<number, StudioData>, item) => {
    const { list_status, node } = item;
    const { num_episodes_watched, score } = list_status;
    const { studios, average_episode_duration } = node;

    if (num_episodes_watched > 0) {
      studios.forEach((studio) => {
        const { id, name } = studio;
        if (!acc[id]) {
          acc[id] = { id, name, anime: [], watchTime: 0, totalScore: 0 };
        }
        acc[id].anime.push(item);
        acc[id].watchTime += num_episodes_watched * average_episode_duration;
        acc[id].totalScore! += score;
      });
    }
    return acc;
  }, {});

  Object.values(rawStudioData).forEach((studioData) => {
    const { totalScore, anime } = studioData;
    studioData.averageScore = totalScore! / anime.length;
    delete studioData.totalScore;
  });

  return rawStudioData;
}
