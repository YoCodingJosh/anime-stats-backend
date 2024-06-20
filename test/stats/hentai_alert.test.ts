import { transformWatchlistToDataRequest, slightlyMoreComplexAndRandomWatchlist, randomWatchlistGenerator, watchlistWithHentai, kaedeToSuzu, victorianMaid, ECCHI_GENRE } from "./data";

import { getHentaiAlertStats } from "../../src/stats/hentai_alert";

import { expect, test } from "vitest";

test("getHentaiAlertStats with no hentai or ecchi", async () => {
  const stats = await getHentaiAlertStats(transformWatchlistToDataRequest(slightlyMoreComplexAndRandomWatchlist));

  expect(stats).toEqual({
    total_count: 0,
    hentai_count: 0,
    ecchi_count: 0,
    total_duration: 0,
    hentai_duration: 0,
    ecchi_duration: 0,
    total_score: 0,
    hentai_score: 0,
    ecchi_score: 0,
  });
})

test("getHentaiAlertStats with just a couple of h-anime", async () => {
  const stats = await getHentaiAlertStats(transformWatchlistToDataRequest(watchlistWithHentai));

  const expectedDuration = kaedeToSuzu.average_episode_duration * kaedeToSuzu.num_episodes + victorianMaid.average_episode_duration * victorianMaid.num_episodes;
  const expectedScore = 10; // hard code yuck

  expect(stats).toEqual({
    total_count: 2,
    hentai_count: 2,
    ecchi_count: 0,
    total_duration: expectedDuration,
    hentai_duration: expectedDuration,
    ecchi_duration: 0,
    total_score: expectedScore,
    hentai_score: expectedScore,
    ecchi_score: 0,
  });
});

test("getHentaiAlertStats with just a couple of ecchi", async () => {
  const watchlist = randomWatchlistGenerator(10, true);

  console.log("Ecchi anime count: ", watchlist.filter((item) => item.node.genres.some((genre) => genre.id === ECCHI_GENRE.id)).length);

  console.log(watchlist);

  const stats = await getHentaiAlertStats(transformWatchlistToDataRequest(watchlist));

  expect(stats.ecchi_count).toBeGreaterThan(0);
  expect(stats.ecchi_count).toEqual(watchlist.filter((item) => item.node.genres.some((genre) => genre.id === ECCHI_GENRE.id)).length);
  expect(stats.hentai_count).toBe(0);

  console.log(stats);
});
