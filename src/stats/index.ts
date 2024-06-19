import { WatchlistDataRequest } from "../schema";

import { getBasicStats } from "./basic";
import { getUnpopularOpinion } from "./unpopular_opinion";
import { getStudioStats } from "./studios";
import { getHentaiAlertStats } from "./hentai_alert";

export interface Stat {
  /**
   * The ID of the stat. This is used to identify the stat in the URL. (ie: /stats/:id)
   */
  id: string;

  /**
   * The name of the stat. This is used to display the stat in the UI.
   */
  name: string;

  /**
   * A description of the stat. This is used to display the stat in the UI.
   */
  description: string;

  /**
   * A function that takes in the user's watchlist and returns the value of the stat.
   */
  calculate: (watchlist: WatchlistDataRequest) => Promise<any>;
}

/**
 * An array of all available stats (excluding the basic stats since that gets sent by default)
 */
export const availableStats: Stat[] = [
  {
    id: "9D469D37-6E05-4CFF-90A3-54C36593E717",
    name: "Unpopular Opinions",
    description: "your unpopular opinions - real hot takes",
    calculate: getUnpopularOpinion,
  },
  {
    id: "2ACC47A3-EB04-4C9B-BBC2-B7F559F14F8A",
    name: "Studios",
    description: "your favorite studios",
    calculate: getStudioStats,
  },
  {
    id: "7DCDD014-1B7E-4EE9-A7DA-2BFD1C0FB93A",
    name: "Hentai Alert!",
    description: "how much (if any) hentai and ecchi you've watched",
    calculate: getHentaiAlertStats,
  },
];

/**
 * An array of all default stats. These get evaluated first and are always sent.
 */
export const defaultStats: Stat[] = [
  {
    id: "72A8BFC4-13BA-4AEA-AC47-69442ECFEC96",
    name: "Basic Stats",
    description: "the basics, like the same stuff that MAL shows on your profile",
    calculate: getBasicStats,
  },
];

/**
 * An array of all stats.
 */
export const allStats = [...defaultStats, ...availableStats];

export async function runDefaultStats(watchlist: WatchlistDataRequest): Promise<any[]> {
  return await Promise.all(defaultStats.map((stat) => stat.calculate(watchlist)));
}

export async function runStats(watchlist: WatchlistDataRequest, stats: string[]): Promise<any[]> {
  const statsToRun = stats.map((stat) => availableStats.find((s) => s.id === stat));

  if (statsToRun.length === 0 || statsToRun.some((stat) => stat === undefined)) {
    throw new Error("Invalid stat ID");
  } else {
    return await Promise.all(statsToRun.map((stat) => stat!.calculate(watchlist)));
  }
}

export async function runAllStats(watchlist: WatchlistDataRequest): Promise<any> {
  let results = new Map<string, any>();

  const defaultResults = await Promise.all(defaultStats.map((stat) => stat.calculate(watchlist)));
  defaultStats.forEach((stat, index) => results.set(stat.id, defaultResults[index]));

  const availableResults = await Promise.all(availableStats.map((stat) => stat.calculate(watchlist)));
  availableStats.forEach((stat, index) => results.set(stat.id, availableResults[index]));

  return results;
}
