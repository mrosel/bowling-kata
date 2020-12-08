import { MAX_ROLL_SCORE } from '../constants';

export const rollScore = rolls => rolls.reduce((score, roll) => score + roll, 0);

export const availableScoreRollButtons = rolls => {
    return (MAX_ROLL_SCORE - rollScore(rolls)) + 1; // include button for 0 pins rolled
}