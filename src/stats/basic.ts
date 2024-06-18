// this is the basic stats that just returns the total duration of all anime watched along with:
// * each type of anime watched (TV, OVA, etc.)
// * number of completed, dropped, on-hold, etc. anime and their total duration and average score (if applicable)

import { WatchlistDataRequest } from "../schema";

export interface BasicStats {
  grandTotalDuration: number;

  totalDuration: number;
  totalAnime: number;
  totalEpisodes: number;

  rewatchedAnime: number;
  rewatchedEpisodes: number;
  rewatchedDuration: number;

  totalMovies: number;
  totalOVA: number;
  totalONA: number;
  totalSpecial: number;
  totalTV: number;
  totalMusic: number;
  totalPV: number;
  totalTVSpecial: number;
  totalCM: number;

  averageScore: number;

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
  };
  watching: {
    count: number;
    totalDuration: number;
    averageScore: number;
  };
}

export async function getBasicStats(watchlist: WatchlistDataRequest): Promise<BasicStats> {
  const basicStats: BasicStats = {
    grandTotalDuration: 0,
    totalDuration: 0,
    totalAnime: 0,
    totalEpisodes: 0,
    rewatchedAnime: 0,
    rewatchedEpisodes: 0,
    rewatchedDuration: 0,
    totalMovies: 0,
    totalOVA: 0,
    totalONA: 0,
    totalSpecial: 0,
    totalTV: 0,
    totalMusic: 0,
    totalPV: 0,
    totalTVSpecial: 0,
    totalCM: 0,
    averageScore: 0,
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
    },
    watching: {
      count: 0,
      totalDuration: 0,
      averageScore: 0,
    },
  };

  // This is used to calculate the average score for all anime that have been scored and not plan to watch
  let averageScoreEligibleAnimeCount = 0;

  watchlist.data.forEach((item) => {
    const { list_status: listStatus, node } = item;
    const { media_type: mediaType } = node;
    const {
      status,
      score,
      num_episodes_watched,
    } = listStatus;

    if (status !== "plan_to_watch" && score !== 0) {
      basicStats.averageScore += score;
      averageScoreEligibleAnimeCount++;
    }

    let duration = 0;

    basicStats.totalAnime++;

    if (listStatus.is_rewatching) {
      basicStats.rewatchedEpisodes += num_episodes_watched;
      basicStats.rewatchedDuration += node.average_episode_duration * num_episodes_watched;
      basicStats.totalEpisodes += node.num_episodes;

      duration = node.average_episode_duration * node.num_episodes;
    } else {
      duration = node.average_episode_duration * num_episodes_watched;
      basicStats.totalEpisodes += num_episodes_watched;
    }

    basicStats.totalDuration += duration;

    if (listStatus.num_times_rewatched && listStatus.num_times_rewatched >= 1) {
      basicStats.rewatchedAnime += listStatus.num_times_rewatched;
      basicStats.rewatchedEpisodes += node.num_episodes * (listStatus.num_times_rewatched);
      basicStats.rewatchedDuration += node.average_episode_duration * (listStatus.num_times_rewatched) * node.num_episodes;
    }

    switch (mediaType) {
      case "movie":
        basicStats.totalMovies++;
        break;
      case "ova":
        basicStats.totalOVA++;
        break;
      case "ona":
        basicStats.totalONA++;
        break;
      case "special":
        basicStats.totalSpecial++;
        break;
      case "tv":
        basicStats.totalTV++;
        break;
      case "music":
        basicStats.totalMusic++;
        break;
      case "pv":
        basicStats.totalPV++;
        break;
      case "tv_special":
        basicStats.totalTVSpecial++;
        break;
      case "cm":
        basicStats.totalCM++;
        break;
    }

    switch (status) {
      case "completed":
        basicStats.completed.count++;
        basicStats.completed.totalDuration += duration;
        basicStats.completed.averageScore += score;
        break;
      case "dropped":
        basicStats.dropped.count++;
        basicStats.dropped.totalDuration += duration;
        basicStats.dropped.averageScore += score;
        break;
      case "on_hold":
        basicStats.onHold.count++;
        basicStats.onHold.totalDuration += duration;
        basicStats.onHold.averageScore += score;
        break;
      case "plan_to_watch":
        basicStats.planToWatch.count++;
        basicStats.planToWatch.totalDuration += node.num_episodes * node.average_episode_duration;
        break;
      case "watching":
        basicStats.watching.count++;
        basicStats.watching.totalDuration += duration;
        basicStats.watching.averageScore += score;
        break;
    }
  });

  basicStats.averageScore = averageScoreEligibleAnimeCount ? basicStats.averageScore / averageScoreEligibleAnimeCount : 0;

  basicStats.completed.averageScore = basicStats.completed.count ? basicStats.completed.averageScore / basicStats.completed.count : 0;
  basicStats.dropped.averageScore = basicStats.dropped.count ? basicStats.dropped.averageScore / basicStats.dropped.count : 0;
  basicStats.onHold.averageScore = basicStats.onHold.count ? basicStats.onHold.averageScore / basicStats.onHold.count : 0;
  basicStats.watching.averageScore = basicStats.watching.count ? basicStats.watching.averageScore / basicStats.watching.count : 0;

  basicStats.grandTotalDuration = basicStats.totalDuration + basicStats.rewatchedDuration;

  return basicStats;
}
