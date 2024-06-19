import { WatchlistDataRequest } from "../schema";

type HentaiData = {
  total_count: number
  hentai_count: number
  ecchi_count: number

  total_duration: number
  hentai_duration: number
  ecchi_duration: number

  total_score: number
  hentai_score: number
  ecchi_score: number
}

const HENTAI_GENRE = { id: 12, name: 'Hentai' };
const ECCHI_GENRE = { id: 9, name: 'Ecchi' };

export async function getHentaiAlertStats(watchlist: WatchlistDataRequest): Promise<HentaiData> {
  const filteredResultSet = watchlist.data.filter((item) => item.list_status.status !== 'plan_to_watch' && item.list_status.score !== 0);
  const hentaiWatchlistData = filteredResultSet.filter((item) => item.node.rating === 'rx' || item.node.genres.some((genre) => genre.id === HENTAI_GENRE.id));
  const ecchiWatchlistData = filteredResultSet.filter((item) => item.node.genres.some((genre) => genre.id === ECCHI_GENRE.id) && !hentaiWatchlistData.includes(item)); // sometimes they have both ecchi and hentai, which is kinda weird

  const combinedList = [...hentaiWatchlistData, ...ecchiWatchlistData];

  const totalDuration = combinedList.reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0);
  const totalScore = combinedList.length > 0 ? combinedList.reduce((acc, item) => acc + item.list_status.score, 0) / combinedList.length : 0;

  // TODO: do more stuff

  return {
    total_count: hentaiWatchlistData.length + ecchiWatchlistData.length,
    hentai_count: hentaiWatchlistData.length,
    ecchi_count: ecchiWatchlistData.length,

    total_duration: totalDuration,
    hentai_duration: hentaiWatchlistData.reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),
    ecchi_duration: ecchiWatchlistData.reduce((acc, item) => acc + item.list_status.num_episodes_watched * item.node.average_episode_duration, 0),

    total_score: totalScore,
    hentai_score: hentaiWatchlistData.length > 0
      ? hentaiWatchlistData.reduce((acc, item) => acc + item.list_status.score, 0) / hentaiWatchlistData.length
      : 0,
    ecchi_score: ecchiWatchlistData.length > 0
      ? ecchiWatchlistData.reduce((acc, item) => acc + item.list_status.score, 0) / ecchiWatchlistData.length
      : 0,
  };
}
