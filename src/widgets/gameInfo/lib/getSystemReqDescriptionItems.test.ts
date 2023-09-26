import { getSystemReqDescriptionItems } from './getSystemReqDescriptionItems';

describe('Function: getSystemReqDescriptionItems', () => {
  test('should return array of description items', () => {
    const data = {
      id: 452,
      title: 'Call Of Duty: Warzone',
      thumbnail: 'https://www.freetogame.com/g/452/thumbnail.jpg',
      status: 'Live',
      shortDescription: 'A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.',
      description: 'Call of Duty: Warzone is both a standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare. Warzone features two modes — the general 150-player battle royle, and “Plunder”. The latter mode is described as a “race to deposit the most Cash”. In both modes players can both earn and loot cash to be used when purchasing in-match equipment, field upgrades, and more. Both cash and XP are earned in a variety of ways, including completing contracts.\r\n\r\nAn interesting feature of the game is one that allows players who have been killed in a match to rejoin it by winning a 1v1 match against other felled players in the Gulag.\r\n\r\nOf course, being a battle royale, the game does offer a battle pass. The pass offers players new weapons, playable characters, Call of Duty points, blueprints, and more. Players can also earn plenty of new items by completing objectives offered with the pass.',
      gameUrl: 'https://www.freetogame.com/open/call-of-duty-warzone',
      genre: 'Shooter',
      platform: 'Windows',
      publisher: 'Activision',
      developer: 'Infinity Ward',
      releaseDate: '2020-03-10',
      freetogameProfileUrl: 'https://www.freetogame.com/call-of-duty-warzone',
      minimumSystemRequirements: {
        os: 'Windows 7 64-Bit (SP1) or Windows 10 64-Bit',
        processor: 'Intel Core i3-4340 or AMD FX-6300',
        memory: '8GB RAM',
        graphics: 'NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950',
        storage: '175GB HD space'
      },
      screenshots: []
    };

    const expectedResult = [
      {
        key: '1',
        label: 'OS',
        children: data.minimumSystemRequirements.os,
      },
      {
        key: '2',
        label: 'Processor',
        children: data.minimumSystemRequirements.processor,
      },
      {
        key: '3',
        label: 'Memory',
        children: data.minimumSystemRequirements.memory,
      },
      {
        key: '4',
        label: 'Graphics',
        children: data.minimumSystemRequirements.graphics,
      },
      {
        key: '5',
        label: 'Storage',
        children: data.minimumSystemRequirements.storage,
      },
    ];

    expect(getSystemReqDescriptionItems(data)).toEqual(expectedResult);
  });
});

