import { gameLogic } from './BowlingLogic';

describe('gameLogic', () => {
  describe('when starting a game', () => {
    it('first strike scores 10', () => {

      const startState = {
        bowls: [{ frame: 1, throw: 1, pins: 10, bonus: 0 }]
      };

      const finState = gameLogic(startState, 1);

      expect(finState.scoreBoard).toEqual([
        { frame: 1, score: 10 }
      ]);

    });
  });
});