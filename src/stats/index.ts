import { WatchlistDataRequest } from "../schema";
import { getBasicStats } from "./basic";

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
  calculate: (watchlist: WatchlistDataRequest) => any;
}

/**
 * An array of all available stats (excluding the basic stats since that gets sent by default)
 */
export const availableStats: Stat[] = [

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

export function runDefaultStats(watchlist: WatchlistDataRequest): any[] {
  return defaultStats.map((stat) => stat.calculate(watchlist));
}