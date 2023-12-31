type CurrentGameSourceType = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: Array<{ id: string; image: string }>;
};

type CurrentGameAdaptedType = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  shortDescription: string;
  description: string;
  gameUrl: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  releaseDate: string;
  freetogameProfileUrl: string;
  minimumSystemRequirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: Array<{ id: string; image: string }>;
};

type GamesSourceType = Omit<
  CurrentGameSourceType,
  'status' | 'description' | 'minimum_system_requirements' | 'screenshots'
>;

type GamesAdaptedType = Omit<
  CurrentGameAdaptedType,
  'status' | 'description' | 'minimumSystemRequirements' | 'screenshots'
>;

type FetchGamesType = {
  params: {
    platform?: typeof import('./const').platforms[number];
    category?: typeof import('./const').genres[number];
    'sort-by'?: typeof import('./const').sortTypes[number];
  };
  cancelToken?: import('axios').CancelToken;
}

type FetchCurrentGameType = {
  id: number;
  cancelToken?: import('axios').CancelToken;
}
