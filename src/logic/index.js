import { MAX_ROLL_SCORE } from '../constants';

export const rollsScore = rolls => rolls.reduce((score, roll) => score + roll, 0);

export const availableScoreRollButtons = rolls => {
    return (MAX_ROLL_SCORE - rollsScore(rolls)) + 1; // include button for 0 pins rolled
}

export const recordRollScore = (currentFrame, score, frames) => {

}
