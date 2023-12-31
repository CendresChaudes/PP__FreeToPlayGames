export const DATE_FORMAT = 'DD-MM-YYYY';
export const REFETCH_ATTEMPTS_COUNT = 3;
export const CACHE_TIME = 5 * 60 * 1000;

export enum Genre {
  All = 'all',
  MMORPG = 'mmorpg',
  Shooter = 'shooter',
  Strategy = 'strategy',
  Moba = 'moba',
  Racing = 'racing',
  Sports = 'sports',
  Social = 'social',
  'Card Games' = 'card',
  MMO = 'mmo',
  Fighting = 'fighting',
}

export enum Platform {
  All = 'all',
  PC = 'pc',
  Browser = 'browser'
}

export enum SortType {
  Relevance = 'relevance',
  Popularity = 'popularity',
  'Release Date' = 'release-date',
  Alphabetical = 'alphabetical'
}
