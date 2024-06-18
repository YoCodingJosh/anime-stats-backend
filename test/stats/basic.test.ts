import { basicWatchlist, transformWatchlistToDataRequest, randomWatchlistGenerator, slightlyMoreComplexAndRandomWatchlist } from "./data";

import { getBasicStats } from "../../src/stats/basic";

import { expect, test } from "vitest";

test("getBasicStats with a little bit of simple data", async () => {
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

test("getBasicStats with no data", async () => {
  const stats = await getBasicStats({ data: [] });

  expect(stats).toEqual({
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
  });
});

test("getBasicStats with some complex and random data", async () => {
  const watchlist = slightlyMoreComplexAndRandomWatchlist;
  const stats = await getBasicStats(transformWatchlistToDataRequest(watchlist));

  expect(stats).toEqual({
    grandTotalDuration: watchlist.reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    totalDuration: watchlist.reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    totalAnime: watchlist.length,
    totalEpisodes: watchlist.reduce((acc, item) => acc + item.list_status.num_episodes_watched, 0),
    rewatchedAnime: watchlist.filter(item => item.list_status.is_rewatching).length,
    rewatchedEpisodes: watchlist.filter(item => item.list_status.is_rewatching).reduce((acc, item) => acc + item.node.num_episodes, 0),
    rewatchedDuration: watchlist.filter(item => item.list_status.is_rewatching).reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0),
    totalMovies: watchlist.filter(item => item.node.media_type === 'movie').length,
    totalOVA: watchlist.filter(item => item.node.media_type === 'ova').length,
    totalONA: watchlist.filter(item => item.node.media_type === 'ona').length,
    totalSpecial: watchlist.filter(item => item.node.media_type === 'special').length,
    totalTV: watchlist.filter(item => item.node.media_type === 'tv').length,
    totalMusic: watchlist.filter(item => item.node.media_type === 'music').length,
    totalPV: watchlist.filter(item => item.node.media_type === 'pv').length,
    totalTVSpecial: watchlist.filter(item => item.node.media_type === 'tv_special').length,
    totalCM: watchlist.filter(item => item.node.media_type === 'cm').length,
    averageScore: watchlist.filter(item => item.list_status.status !== 'plan_to_watch' && item.list_status.score !== 0).reduce((acc, item) => acc + item.list_status.score, 0) / watchlist.filter(item => item.list_status.status !== 'plan_to_watch' && item.list_status.score !== 0).length,
    completed: {
      averageScore: watchlist.filter(item => item.list_status.status === 'completed').length > 0 ? watchlist.filter(item => item.list_status.status === 'completed').reduce((acc, item) => acc + item.list_status.score, 0) / watchlist.filter(item => item.list_status.status === 'completed').length : 0,
      count: watchlist.filter(item => item.list_status.status === 'completed').length,
      totalDuration: watchlist.filter(item => item.list_status.status === 'completed').reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0),
    },
    dropped: {
      averageScore: watchlist.filter(item => item.list_status.status === 'dropped').length > 0 ? watchlist.filter(item => item.list_status.status === 'dropped').reduce((acc, item) => acc + item.list_status.score, 0) / watchlist.filter(item => item.list_status.status === 'dropped').length : 0,
      count: watchlist.filter(item => item.list_status.status === 'dropped').length,
      totalDuration: watchlist.filter(item => item.list_status.status === 'dropped').reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    },
    onHold: {
      averageScore: watchlist.filter(item => item.list_status.status === 'on_hold').length > 0 ? watchlist.filter(item => item.list_status.status === 'on_hold').reduce((acc, item) => acc + item.list_status.score, 0) / watchlist.filter(item => item.list_status.status === 'on_hold').length : 0,
      count: watchlist.filter(item => item.list_status.status === 'on_hold').length,
      totalDuration: watchlist.filter(item => item.list_status.status === 'on_hold').reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    },
    planToWatch: {
      count: watchlist.filter(item => item.list_status.status === 'plan_to_watch').length,
      totalDuration: watchlist.filter(item => item.list_status.status === 'plan_to_watch').reduce((acc, item) => acc + item.node.num_episodes * item.node.average_episode_duration, 0),
    },
    watching: {
      averageScore: watchlist.filter(item => item.list_status.status === 'watching').length > 0 ? watchlist.filter(item => item.list_status.status === 'watching').reduce((acc, item) => acc + item.list_status.score, 0) / watchlist.filter(item => item.list_status.status === 'watching').length : 0,
      count: watchlist.filter(item => item.list_status.status === 'watching').length,
      totalDuration: watchlist.filter(item => item.list_status.status === 'watching').reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    },
  })
});
