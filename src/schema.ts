// MAL API Schema

export type ItemStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export interface WatchlistEndpointResponseListStatus {
  status: ItemStatus;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
  priority?: number;
  num_times_rewatched?: number;
  rewatch_value?: number;
  tags?: string[];
  comments?: string;
};

export interface WatchlistEndpointResponseNode {
  id: string;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };
  start_date: string;
  end_date: string;
  mean: number;
  rank: number;
  popularity: number;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: string;
  created_at: string;
  updated_at: string;
  media_type: string;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];
  num_episodes: number;
  start_season: {
    year: number;
    season: string;
  };
  source: string;
  average_episode_duration: number;
  rating: string;
  studios: {
    id: number;
    name: string;
  }[];
};

export interface WatchlistEndpointResponseData {
  node: WatchlistEndpointResponseNode;
  list_status: WatchlistEndpointResponseListStatus;
};

export interface WatchlistEndpointResponse {
  data: WatchlistEndpointResponseData[];
  paging: {
    next?: string;
  };
};

export interface JikanErrorResponse {
  status: number;
  type: string;
  message: string;
  error: string;
}

export interface JikanUserResponse {
  data: {
    mal_id: number;
    username: string;
    url: string;
    images: {
      jpg: {
        image_url: string;
      },
      webp: {
        image_url: string;
      }
    },
    last_online: string;
    gender?: string;
    birthday?: string;
    location?: string;
    joined: string;
  }
}

export type Bindings = {
  MAL_CLIENT_ID: string,
};
