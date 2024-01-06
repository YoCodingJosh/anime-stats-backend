// The user's unpopular opinion is abs(floor(avg_score) - user_score) or abs(ceil(avg_score) - user_score) >= 2
// This stat will return the top 25 higher and top 25 lower score deviations.

import { WatchlistDataRequest, WatchlistEndpointResponseData } from "../schema";

export interface UnpopularOpinion {
  higher: WatchlistEndpointResponseData[] | null,
  lower: WatchlistEndpointResponseData[] | null,
  message?: string,
};

export function getUnpopularOpinion(watchlist: WatchlistDataRequest): UnpopularOpinion {
  const unpopularOpinion: UnpopularOpinion = {
    higher: null,
    lower: null,
  };

  let scoredAnime = watchlist.data.filter((item) => item.list_status.score !== 0 && item.list_status.status !== "plan_to_watch"); // for some reason you can score plan to watch anime

  if (scoredAnime.length === 0) {
    unpopularOpinion.message = "You have no scored anime";

    return unpopularOpinion;
  }

  // go through each anime and calculate the difference between the user's score and the average score
  // and return the top 10 higher score deviations based upon abs(floor(avg_score) - user_score) or abs(ceil(avg_score) - user_score) >= 2
  const scoreDeviations = scoredAnime.filter((item) => {
    const avgScore = item.node.mean;
    const userScore = item.list_status.score;
    const differenceCeil = Math.abs(Math.ceil(avgScore) - userScore);
    const differenceFloor = Math.abs(Math.floor(avgScore) - userScore);

    return differenceCeil >= 2 || differenceFloor >= 2;
  });

  if (scoreDeviations.length === 0) {
    unpopularOpinion.message = "You have no unpopular opinions";

    return unpopularOpinion;
  }

  // sort the score deviations by the difference between the user's score and the average score
  scoreDeviations.sort((a, b) => (Math.abs(a.list_status.score - a.node.mean) > Math.abs(b.list_status.score - b.node.mean)) ? -1 : 1);

  // extract the top 25 higher deviations - where the user's score is higher than the average score
  unpopularOpinion.higher = scoreDeviations.filter((item) => item.list_status.score > item.node.mean).slice(0, 25);

  // extract the top 25 lower deviations - where the user's score is lower than the average score
  unpopularOpinion.lower = scoreDeviations.filter((item) => item.list_status.score < item.node.mean).slice(0, 25);

  // TODO: since on MAL, specials and OVAs are always scored lower than the main series, should we filter them out?

  return unpopularOpinion;
}
