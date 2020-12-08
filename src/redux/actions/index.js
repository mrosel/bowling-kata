import * as TYPES from './types';

export const scoreRoll = score => ({
    type: TYPES.SCORE_ROLL,
    score
});

export const resetGame = () => ({
    type: TYPES.RESET_GAME
});
