import { BONUS_TYPE, MAX_ROLL_SCORE, TOTAL_FRAMES } from '../constants';

export const getCurrentFrame = frames => frames.find(frame => frame.isCurrent);

export const availableScoreButtons = rolls => {
    const scoreButtons = MAX_ROLL_SCORE - rollsScore(rolls);
    return scoreButtons && scoreButtons + 1; // include button to score 0 pins rolled if other score buttons are available
}

export const rollsScore = rolls => rolls.reduce((score, roll) => score + roll, 0);

export const recordRollScore = (rollScore, frames) => {
    const currentFrame = getCurrentFrame(frames);
    const updatedFrame = Object.assign({}, currentFrame, {
        rolls: [...currentFrame.rolls, rollScore]
    });

    if (!updatedFrame.bonusType && rollsScore(updatedFrame.rolls) === MAX_ROLL_SCORE) {
        updatedFrame.bonusType = updatedFrame.rolls.length === 1 ? BONUS_TYPE.STRIKE : BONUS_TYPE.SPARE;
    }

    return frames.map(frame => frame.frameNum === updatedFrame.frameNum ? updatedFrame : frame);
}

export const getMaxRolls = (is10thFrame, bonusTypeIsSet) => {
    if (!is10thFrame && bonusTypeIsSet) return 1; // max is 1 for strike and 2 for spare, but using 1 handles both bonusTypes below when determing current frame
    if (is10thFrame && bonusTypeIsSet) return 3;
    return 2;
};

export const setCurrentFrame = frames => {
    // const currentFrame = getCurrentFrame(frames);
    // const is10thFrame = currentFrame.frameNum === TOTAL_FRAMES;
    // const maxRolls = is10thFrame && currentFrame.bonusType ? 3 : 2; // max rolls per frame is 2 unless its 10th frame and a strike or spare is scored

    // const { frameNum, rolls, bonusType } = getCurrentFrame(frames);
    // const is10thFrame = frameNum === TOTAL_FRAMES;
    // const maxRolls = is10thFrame && bonusType ? 3 : 2; // max rolls per frame is 2 unless its 10th frame and a strike or spare is scored

    const { frameNum, rolls, bonusType } = getCurrentFrame(frames);
    const newCurrentFrameNum = frameNum + 1;
    const maxRolls = getMaxRolls.bind(null, frameNum === TOTAL_FRAMES, !!bonusType);

    console.log('frameNum:', frameNum, "-", maxRolls(), "-", rolls, Date.now());

    // if rolls have NOT exceeded the max for this frame, this is still current frame
    if (rolls.length < maxRolls()) {
        return frames;
    }
    console.log('updating current frame to:', newCurrentFrameNum, Date.now());

    return frames.map(frame => {
        if (frame.frameNum !== frameNum && frame.frameNum !== newCurrentFrameNum) {
            return frame;
        }
        return {
            ...frame,
            isCurrent: frame.frameNum === newCurrentFrameNum
        }
    });
};

export const calculateFrameScores = frames => {
    return frames.map(frame => {
        if (frame.accruedFrameScore === null) {

        }

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

