export const adaptCurrentGameFromAPI = (game: GameSourceType): GameAdaptedType => {
  const adaptedGame = {
    ...game,
    shortDescription: game.short_description,
    gameUrl: game.game_url,
    releaseDate: game.release_date,
    freetogameProfileUrl: game.freetogame_profile_url,
    minimumSystemRequirements: game.minimum_system_requirements
  };

  delete (adaptedGame as Partial<GameSourceType>).short_description;
  delete (adaptedGame as Partial<GameSourceType>).game_url;
  delete (adaptedGame as Partial<GameSourceType>).release_date;
  delete (adaptedGame as Partial<GameSourceType>).freetogame_profile_url;
  delete (adaptedGame as Partial<GameSourceType>).minimum_system_requirements;

  return adaptedGame as GameAdaptedType;
};