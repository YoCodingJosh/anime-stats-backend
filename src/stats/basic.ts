// this is the basic stats that just returns the total duration of all anime watched along with:
// * each type of anime watched (TV, OVA, etc.)
// * number of completed, dropped, on-hold, etc. anime and their total duration and average score (if applicable)

import { WatchlistDataRequest } from "../schema";

export interface BasicStats {
  totalDuration: number;
  totalAnime: number;
  totalEpisodes: number;
  totalMovies: number;
  totalOVA: number;
  totalONA: number;
  totalSpecial: number;
  totalTV: number;
  completed: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
  dropped: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
  onHold: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
  planToWatch: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
  watching: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
}

export function getBasicStats(
  watchlist: WatchlistDataRequest
): BasicStats {
  const basicStats: BasicStats = {
    totalDuration: 0,
    totalAnime: 0,
    totalEpisodes: 0,
    totalMovies: 0,
    totalOVA: 0,
    totalONA: 0,
    totalSpecial: 0,
    totalTV: 0,
    completed: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
    dropped: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
    onHold: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
    planToWatch: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
    watching: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
  };

  watchlist.data.forEach((item) => {
    const { list_status: listStatus, node } = item;
    const { media_type: mediaType, num_episodes: numEpisodes } = node;
    const {
      status,
      score,
      num_episodes_watched: numEpisodesWatched,
    } = listStatus;

    const duration = numEpisodesWatched * node.average_episode_duration;

    basicStats.totalDuration += duration;
    basicStats.totalAnime += 1;
    basicStats.totalEpisodes += numEpisodes;

    switch (mediaType) {
      case "movie":
        basicStats.totalMovies += 1;
        break;
      case "ova":
        basicStats.totalOVA += 1;
        break;
      case "ona":
        basicStats.totalONA += 1;
        break;
      case "special":
        basicStats.totalSpecial += 1;
        break;
      case "tv":
        basicStats.totalTV += 1;
        break;
    }

    switch (status) {
      case "completed":
        basicStats.completed.count += 1;
        basicStats.completed.totalDuration += duration;
        basicStats.completed.averageScore += score;
        break;
      case "dropped":
        basicStats.dropped.count += 1;
        basicStats.dropped.totalDuration += duration;
        basicStats.dropped.averageScore += score;
        break;
      case "on_hold":
        basicStats.onHold.count += 1;
        basicStats.onHold.totalDuration += duration;
        basicStats.onHold.averageScore += score;
        break;
      case "plan_to_watch":
        basicStats.planToWatch.count += 1;
        basicStats.planToWatch.totalDuration += duration;
        basicStats.planToWatch.averageScore += score;
        break;
      case "watching":
        basicStats.watching.count += 1;
        basicStats.watching.totalDuration += duration;
        basicStats.watching.averageScore += score;
        break;
    }
  });

  basicStats.completed.averageScore /= basicStats.completed.count;
  basicStats.dropped.averageScore /= basicStats.dropped.count;
  basicStats.onHold.averageScore /= basicStats.onHold.count;
  basicStats.planToWatch.averageScore /= basicStats.planToWatch.count;
  basicStats.watching.averageScore /= basicStats.watching.count;

  return basicStats;
}
