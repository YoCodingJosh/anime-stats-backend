import { WatchlistEndpointResponseNode, WatchlistEndpointResponseData, WatchlistDataRequest } from '../../schema';

export const gochiusa: WatchlistEndpointResponseNode = {
  id: "21273",
  title: 'Gochuumon wa Usagi Desu ka?',
  num_episodes: 12,
  start_season: {
    year: 2014,
    season: 'spring'
  },
  source: 'manga',
  average_episode_duration: 24,
  rating: 'pg',
  studios: [
    { id: 1, name: 'White Fox' }
  ],
  genres: [
    { id: 1, name: 'slice of life' },
    { id: 2, name: 'comedy' }
  ],
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2021-01-01T00:00:00Z',
  main_picture: {
    medium: 'https://cdn.myanimelist.net/images/anime/6/79600.jpg',
    large: 'https://cdn.myanimelist.net/images/anime/6/79600l.jpg'
  },
  start_date: '2014-04-10',
  end_date: '2014-06-26',
  status: 'finished_airing',
  mean: 7.49,
  rank: 123,
  popularity: 456,
  num_list_users: 789,
  nsfw: 'white',
  num_scoring_users: 123,
  media_type: 'tv',
};

export const naruto: WatchlistEndpointResponseNode = {
  id: "20",
  title: 'Naruto',
  num_episodes: 220,
  start_season: {
    year: 2002,
    season: 'fall'
  },
  media_type: 'tv',
  source: 'manga',
  average_episode_duration: 24,
  rating: 'pg-13',
  studios: [
    { id: 1, name: 'Pierrot' }
  ],
  genres: [
    { id: 1, name: 'action' },
    { id: 2, name: 'adventure' },
    { id: 3, name: 'comedy' }
  ],
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2021-01-01T00:00:00Z',
  main_picture: {
    medium: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    large: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg'
  },
  start_date: '2002-10-03',
  end_date: '2007-02-08',
  status: 'finished_airing',
  mean: 7.9,
  rank: 123,
  popularity: 456,
  num_list_users: 789,
  nsfw: 'white',
  num_scoring_users: 123,
};

export const yuruCamp: WatchlistEndpointResponseNode = {
  id: "34798",
  title: 'Yuru Camp△',
  num_episodes: 12,
  start_season: {
    year: 2018,
    season: 'winter'
  },
  media_type: 'tv',
  source: 'manga',
  average_episode_duration: 24,
  rating: 'pg',
  studios: [
    { id: 1, name: 'C-Station' }
  ],
  genres: [
    { id: 1, name: 'slice of life' },
    { id: 2, name: 'comedy' }
  ],
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2021-01-01T00:00:00Z',
  main_picture: {
    medium: 'https://cdn.myanimelist.net/images/anime/8/88103.jpg',
    large: 'https://cdn.myanimelist.net/images/anime/8/88103l.jpg'
  },
  start_date: '2018-01-04',
  end_date: '2018-03-22',
  status: 'finished_airing',
  mean: 8.27,
  rank: 123,
  popularity: 456,
  num_list_users: 789,
  nsfw: 'white',
  num_scoring_users: 123,
};

export const basicWatchlist: WatchlistEndpointResponseData[] = [
  { node: gochiusa, list_status: { status: 'completed', score: 10, num_episodes_watched: 12, is_rewatching: false, updated_at: Date.now().toString(), } },
  { node: naruto, list_status: { status: 'completed', score: 7, num_episodes_watched: 220, is_rewatching: false, updated_at: Date.now().toString(), } },
  { node: yuruCamp, list_status: { status: 'completed', score: 10, num_episodes_watched: 12, is_rewatching: false, updated_at: Date.now().toString(), } },
];

export const transformWatchlistToDataRequest = (data: WatchlistEndpointResponseData[]): WatchlistDataRequest => {
  return { data };
}
