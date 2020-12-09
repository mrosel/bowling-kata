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

export const calculateFrameScores = frames => {
    return frames.map(frame => {
        return frame;
    });
    // frameNum: index + 1,
    // rolls: [],
    // bonusType: null,
    // bonusRolls: [],
    // frameScore: null,
    // accruedFrameScore: null,
    // isCurrent: index === 0,
}

