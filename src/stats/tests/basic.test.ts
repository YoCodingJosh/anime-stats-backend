import { basicWatchlist, transformWatchlistToDataRequest } from "./data";

import { BasicStats, getBasicStats } from "../basic";

import { expect, test } from "vitest";

test("getBasicStats with a little bit of data", async () => {

  const EXPECTED_GRAND_TOTAL_DURATION = basicWatchlist.reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0);
  const EXPECTED_TOTAL_DURATION = basicWatchlist.reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0);
  const EXPECTED_TOTAL_ANIME = basicWatchlist.length;
  const EXPECTED_TOTAL_EPISODES = basicWatchlist.reduce((acc, item) => acc + item.node.num_episodes, 0);
  const EXPECTED_REWATCHED_ANIME = 0;
  const EXPECTED_REWATCHED_EPISODES = 0;
  const EXPECTED_REWATCHED_DURATION = 0;
  const EXPECTED_TOTAL_MOVIES = 0;
  const EXPECTED_TOTAL_OVA = 0;
  const EXPECTED_TOTAL_ONA = 0;
  const EXPECTED_TOTAL_SPECIAL = 0;
  const EXPECTED_TOTAL_TV = 3;
  const EXPECTED_TOTAL_MUSIC = 0;
  const EXPECTED_TOTAL_PV = 0;
  const EXPECTED_TOTAL_TV_SPECIAL = 0;
  const EXPECTED_TOTAL_CM = 0;
  const EXPECTED_AVERAGE_SCORE = 9;
  const EXPECTED_COMPLETED_COUNT = 3;
  const EXPECTED_COMPLETED_TOTAL_DURATION = basicWatchlist.reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0);
  const EXPECTED_COMPLETED_AVERAGE_SCORE = 9;
  const EXPECTED_DROPPED_COUNT = 0;
  const EXPECTED_DROPPED_TOTAL_DURATION = 0;
  const EXPECTED_DROPPED_AVERAGE_SCORE = 0;
  const EXPECTED_ON_HOLD_COUNT = 0;
  const EXPECTED_ON_HOLD_TOTAL_DURATION = 0;
  const EXPECTED_ON_HOLD_AVERAGE_SCORE = 0;
  const EXPECTED_PLAN_TO_WATCH_COUNT = 0;
  const EXPECTED_PLAN_TO_WATCH_TOTAL_DURATION = 0;
  const EXPECTED_WATCHING_COUNT = 0;
  const EXPECTED_WATCHING_TOTAL_DURATION = 0;
  const EXPECTED_WATCHING_AVERAGE_SCORE = 0;

  const stats = await getBasicStats(transformWatchlistToDataRequest(basicWatchlist));

  expect(stats).toEqual({
    grandTotalDuration: EXPECTED_GRAND_TOTAL_DURATION,
    totalDuration: EXPECTED_TOTAL_DURATION,
    totalAnime: EXPECTED_TOTAL_ANIME,
    totalEpisodes: EXPECTED_TOTAL_EPISODES,
    rewatchedAnime: EXPECTED_REWATCHED_ANIME,
    rewatchedEpisodes: EXPECTED_REWATCHED_EPISODES,
    rewatchedDuration: EXPECTED_REWATCHED_DURATION,
    totalMovies: EXPECTED_TOTAL_MOVIES,
    totalOVA: EXPECTED_TOTAL_OVA,
    totalONA: EXPECTED_TOTAL_ONA,
    totalSpecial: EXPECTED_TOTAL_SPECIAL,
    totalTV: EXPECTED_TOTAL_TV,
    totalMusic: EXPECTED_TOTAL_MUSIC,
    totalPV: EXPECTED_TOTAL_PV,
    totalTVSpecial: EXPECTED_TOTAL_TV_SPECIAL,
    totalCM: EXPECTED_TOTAL_CM,
    averageScore: EXPECTED_AVERAGE_SCORE,
    completed: {
      count: EXPECTED_COMPLETED_COUNT,
      totalDuration: EXPECTED_COMPLETED_TOTAL_DURATION,
      averageScore: EXPECTED_COMPLETED_AVERAGE_SCORE,
    },
    dropped: {
      count: EXPECTED_DROPPED_COUNT,
      totalDuration: EXPECTED_DROPPED_TOTAL_DURATION,
      averageScore: EXPECTED_DROPPED_AVERAGE_SCORE,
    },
    onHold: {
      count: EXPECTED_ON_HOLD_COUNT,
      totalDuration: EXPECTED_ON_HOLD_TOTAL_DURATION,
      averageScore: EXPECTED_ON_HOLD_AVERAGE_SCORE,
    },
    planToWatch: {
      count: EXPECTED_PLAN_TO_WATCH_COUNT,
      totalDuration: EXPECTED_PLAN_TO_WATCH_TOTAL_DURATION,
    },
    watching: {
      count: EXPECTED_WATCHING_COUNT,
      totalDuration: EXPECTED_WATCHING_TOTAL_DURATION,
      averageScore: EXPECTED_WATCHING_AVERAGE_SCORE,
    },
  });
});
