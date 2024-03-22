import { WatchlistEndpointResponseNode, WatchlistEndpointResponseData, WatchlistDataRequest, ItemStatus, MediaType } from '../../schema';

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

export const randomWatchlistGenerator = (length: number = 10): WatchlistEndpointResponseData[] => {
  const watchlist: WatchlistEndpointResponseData[] = [];

  for (let i = 0; i < length; i++) {
    const watchlistStatuses: ItemStatus[] = ['completed', 'dropped', 'on_hold', 'plan_to_watch', 'watching']; // yuck duplicated code
    const randomStatus = watchlistStatuses[Math.floor(Math.random() * watchlistStatuses.length)];

    const mediaTypes: MediaType[] = ['tv', 'ova', 'movie', 'special', 'ona', 'music', 'pv', 'cm', 'tv_special'];
    const randomMediaType: MediaType = mediaTypes[Math.floor(Math.random() * mediaTypes.length)];

    const randomMean = Math.floor(Math.random() * 11);
    const randomScore = Math.floor(Math.random() * 11);

    const randomNumEpisodes = Math.floor(Math.random() * 24) + 12;

    // try to guess which studios they reference :^)
    const fakeStudios = [
      { id: 1, name: 'Black Fox' },
      { id: 2, name: 'Studio Clown' },
      { id: 3, name: 'X-Station' },
      { id: 4, name: 'Asylum' },
      { id: 5, name: 'Broken Bones' },
      { id: 6, name: 'Sunset' },
      { id: 7, name: 'B-2 Pictures' },
      { id: 8, name: 'Goliath Production' },
      { id: 9, name: 'Eight' },
      { id: 10, name: 'EGG SOFT' },
      { id: 11, name: 'GOLD LINK.' },
      { id: 12, name: 'project No.10' },
      { id: 13, name: 'Cylinder' },
      { id: 14, name: '16-bit' },
    ];

    // random studio as an array, but sometimes there may be two or three.
    const randomStudios = [];
    const numStudios = Math.floor(Math.pow(Math.random(), 2) * 3) + 1; // This will give 1 most of the time, but sometimes 2 or 3

    for (let i = 0; i < numStudios; i++) {
      randomStudios.push(fakeStudios[Math.floor(Math.random() * fakeStudios.length)]);
    }

    watchlist.push({
      node: {
        id: i.toString(),
        title: `Anime ${i}`,
        num_episodes: randomNumEpisodes,
        start_season: {
          year: Math.floor(Math.random() * 35) + 1989,
          season: 'spring'
        },
        source: Math.random() > 0.5 ? 'manga' : 'light novel',
        average_episode_duration: Math.floor(Math.random() * 24) + 12,
        rating: 'pg',
        studios: randomStudios,
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
        mean: randomMean,
        rank: 123,
        popularity: 456,
        num_list_users: 789,
        nsfw: 'white',
        num_scoring_users: 123,
        media_type: randomMediaType,
      },
      list_status: {
        status: randomStatus,
        score: randomScore,
        num_episodes_watched: randomStatus === 'completed' ? randomNumEpisodes : Math.floor(Math.random() * randomNumEpisodes),
        is_rewatching: false,
        updated_at: Date.now().toString(),
      }
    });
  }

  return watchlist;
}
