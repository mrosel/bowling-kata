import * as TYPES from './types';

export const scoreRoll = rollScore => ({
    type: TYPES.SCORE_ROLL,
    rollScore
});

export const resetGame = () => ({
    type: TYPES.RESET_GAME
});
