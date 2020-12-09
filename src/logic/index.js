import { BONUS_TYPE, MAX_ROLL_SCORE } from '../constants';

export const rollsScore = rolls => rolls.reduce((score, roll) => score + roll, 0);

export const availableScoreRollButtons = rolls => {
    return (MAX_ROLL_SCORE - rollsScore(rolls)) + 1; // include button for 0 pins rolled
}

export const recordRollScore = (currentFrame, rollScore, frames) => {
    const updatedFrame = Object.assign({}, currentFrame, {
        rolls: [...currentFrame.rolls, rollScore]
    });

    if (rollsScore(updatedFrame.rolls) === MAX_ROLL_SCORE) {
        updatedFrame.bonusType = updatedFrame.rolls.length === 1 ? BONUS_TYPE.STRIKE : BONUS_TYPE.SPARE;
    }

    return frames.map(frame => frame.frameNum === updatedFrame.frameNum ? updatedFrame : frame);
}

