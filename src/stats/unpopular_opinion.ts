// The user's unpopular opinion is that their score is > 2 points higher/lower than the average score.
// This will return the top 10 higher and top 10 lower score deviations.

import { WatchlistDataRequest } from "../schema";

export interface UnpopularOpinion {
  higher: [

  ],
  lower: [

  ]
};

export function getUnpopularOpinion(watchlist: WatchlistDataRequest): UnpopularOpinion {
  const unpopularOpinion: UnpopularOpinion = {
    higher: [

    ],
    lower: [

    ]
  };

  // TODO: implement this

  return unpopularOpinion;
}
