// MAL API Schema

export type ItemStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

export interface ListStatus {
  status: ItemStatus;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
  priority: number;
  num_times_rewatched: number;
  rewatch_value: number;
  tags: string[];
  comments: string;
};

export interface WatchlistEndpointResponseListStatus {
  status: ItemStatus;
  score: number;
  num_episodes_watched: number;
  is_rewatching: boolean;
  updated_at: string;
};

export interface WatchlistEndpointResponseNode {
  id: string;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };
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