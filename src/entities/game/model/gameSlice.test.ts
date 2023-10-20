import { APIStatus } from '@/shared/api/const';
import { fetchCurrentGame } from '../api/fetchCurrentGame';
import { fetchGames } from '../api/fetchGames';
import { Platform, Genre, SortType, REFETCH_ATTEMPTS_COUNT } from '../const';
import { createAdaptedMockCurrentGameData } from '../tests-lib/createAdaptedMockCurrentGameData';
import { createAdaptedMockGamesData } from '../tests-lib/createAdaptedMockGamesData';
import {
  gameSlice,
  changeCurrentPlatformFilter,
  changeCurrentGenreFilter,
  changeCurrentSortType,
  decrementGamesRefetchAttemptsCount,
  decrementCurrentGameRefetchAttemptsCount,
  initialStateType,
} from './gameSlice';

jest.mock('@/shared/lib', () => ({
  __esModule: true
}));

jest.mock('@/shared/api', () => ({
  __esModule: true,
  APIStatus
}));

jest.mock('../api/adaptGamesFromAPI', () => ({
  adaptGamesFromAPI: () => null
}));

jest.mock('../api/adaptCurrentGameFromAPI', () => ({
  adaptCurrentGameFromAPI: () => null
}));

describe('Redux slice: gameSlice', () => {
  const mockGamesData = createAdaptedMockGamesData();
  const mockCurrentGameData = createAdaptedMockCurrentGameData();

  const initialState: initialStateType = {
    games: [],
    gamesStatus: APIStatus.Idle,
    currentGame: null,
    currentGameStatus: APIStatus.Idle,
    currentPlatformFilter: Platform.All,
    currentGenreFilter: Genre.All,
    currentSortType: SortType.Relevance,
    gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
    currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
  };

  describe('Reducer: changeCurrentPlatformFilter', () => {
    test('Should change a current platform filter', () => {
      const platformFilter = Platform.Browser;

      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.Browser,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, changeCurrentPlatformFilter(platformFilter));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Reducer: changeCurrentGenreFilter', () => {
    test('Should change a current genre filter', () => {
      const genreFilter = Genre.MMORPG;

      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.MMORPG,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, changeCurrentGenreFilter(genreFilter));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Reducer: changeCurrentSortType', () => {
    test('Should change a current sort type', () => {
      const sortType = SortType.Alphabetical;

      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Alphabetical,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, changeCurrentSortType(sortType));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Reducer: decrementGamesRefetchAttemptsCount', () => {
    test('Should decrement games refetch attempts count by one', () => {
      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT - 1,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, decrementGamesRefetchAttemptsCount);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Reducer: decrementCurrentGameRefetchAttemptsCount', () => {
    test('Should decrement games refetch attempts count by one', () => {
      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT - 1,
      };

      const result = gameSlice.reducer(initialState, decrementCurrentGameRefetchAttemptsCount);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Extra reducer: fetchGames', () => {
    test('fetchGames.pending should set "gamesStatus" to "APIStatus.Pending"', () => {
      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Pending,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, fetchGames.pending);

      expect(result).toEqual(expectedResult);
    });

    test(`fetchGames.fulfilled should set "gamesStatus" to "APIStatus.Fulfilled", "games" to array with data,
        "gamesRefetchAttemptsCount" to "REFETCH_ATTEMPTS_COUNT" (default value)`, () => {
      const stateBeforeFulfilled = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: 1,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const mockParams: FetchGamesData = {
        params: {
          platform: Platform.All,
          category: Genre.All,
          'sort-by': SortType.Relevance,
        },
      };

      const expectedResult = {
        games: mockGamesData,
        gamesStatus: APIStatus.Fulfilled,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(stateBeforeFulfilled, fetchGames.fulfilled(mockGamesData, '', mockParams));

      expect(result).toEqual(expectedResult);
    });

    test('fetchGames.rejected should set "gamesStatus" to "APIStatus.Rejected"', () => {
      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Rejected,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, fetchGames.rejected);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Extra reducer: fetchCurrentGame', () => {
    test('fetchCurrentGame.pending should set "currentGameStatus" to "APIStatus.Pending"', () => {
      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Pending,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(initialState, fetchCurrentGame.pending);

      expect(result).toEqual(expectedResult);
    });

    test(`fetchCurrentGame.fulfilled should set "currentGameStatus" to "APIStatus.Fulfilled", "currentGame" to current game data,
        "currentGameRefetchAttemptsCount" to "REFETCH_ATTEMPTS_COUNT" (default value)`, () => {
      const stateBeforeFulfilled = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Idle,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: 1,
      };

      const mockParams: FetchCurrentGameData = { id: 1 };

      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: mockCurrentGameData,
        currentGameStatus: APIStatus.Fulfilled,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(stateBeforeFulfilled, fetchCurrentGame.fulfilled(mockCurrentGameData, '', mockParams));

      expect(result).toEqual(expectedResult);
    });

    test('fetchCurrentGame.rejected should set "currentGameStatus" to "APIStatus.Rejected", "currentGame" to "null"', () => {
      const stateBeforeRejected = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: mockCurrentGameData,
        currentGameStatus: APIStatus.Rejected,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const expectedResult = {
        games: [],
        gamesStatus: APIStatus.Idle,
        currentGame: null,
        currentGameStatus: APIStatus.Rejected,
        currentPlatformFilter: Platform.All,
        currentGenreFilter: Genre.All,
        currentSortType: SortType.Relevance,
        gamesRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
        currentGameRefetchAttemptsCount: REFETCH_ATTEMPTS_COUNT,
      };

      const result = gameSlice.reducer(stateBeforeRejected, fetchCurrentGame.rejected);

      expect(result).toEqual(expectedResult);
    });
  });
});
