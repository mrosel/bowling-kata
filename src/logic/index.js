import { BONUS_TYPE, MAX_ROLL_SCORE, TOTAL_FRAMES } from '../constants';

export const getCurrentFrame = frames => frames.find(frame => frame.isCurrent);

export const availableScoreButtons = ({ frameNum, rolls, bonusType }) => {
    let scoreButtons;

    // if NOT 10th frame OR (implicity it is 10th frame AND) bonusType is NOT set for 10th frame, available score buttons are based on total of rolls
    if (frameNum < TOTAL_FRAMES || !bonusType) {
        scoreButtons = MAX_ROLL_SCORE - rollsScore(rolls);
    } else { // else there is a bonusType for 10th frame
        const secondRollMade = rolls.length >= 2;
        const [, secondRoll] = rolls;

        // if there is strike in 10th frame AND 2nd roll has been made AND 2nd roll is NOT a strike
        // else 10th frame is spare
        //   -OR- 10th frame is strike and 2nd roll has NOT been made yet
        //   -OR- 10th frame is strike and 2nd roll has been made and it is strike
        if (bonusType === BONUS_TYPE.STRIKE && secondRollMade && secondRoll !== MAX_ROLL_SCORE) {
            scoreButtons = MAX_ROLL_SCORE - secondRoll;
        } else {
            scoreButtons = MAX_ROLL_SCORE;
        }
    }

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
    if (!is10thFrame && bonusTypeIsSet) return 1; // max is 1 for strike and 2 for spare, but using "1" handles both bonusTypes below when determining which frame is current
    if (is10thFrame && bonusTypeIsSet) return 3;
    return 2;
};

export const calculateFrameScores = frames => {
    return frames.map((frame, frameIndex) => {
        const { frameNum, rolls, bonusType, frameScore } = frame;

        // if frame score has been calculated already OR frame score can NOT be calculated yet, skip it
        if (frameScore !== null || !rolls.length) {
            return frame;
        }

        // if bonusType is NOT set AND max rolls have been made (10th frame is not a special case if there is no bonusType)
        if (!bonusType && rolls.length === getMaxRolls(false, false)) {
            return {
                ...frame,
                frameScore: rollsScore(rolls)
            };
        }

        if (bonusType) {
            const is10thFrame = frameNum === TOTAL_FRAMES;
            let bonusRolls;

            // if 10th frame, get bonus roll(s) from this frame rolls (if strike, take last 2 rolls, else take only last roll)
            // else get bonus roll(s) from next 2 frames (if strike, take first 2 rolls, else take only first roll)
            if (is10thFrame) {
                bonusRolls = rolls.slice(bonusType === BONUS_TYPE.STRIKE ? 1 : 2);
            } else {
                bonusRolls = frames.slice(frameIndex + 1, frameIndex + 3).reduce((bonusRolls, frame) => {
                    return [...bonusRolls, ...frame.rolls];
                }, []);
                bonusRolls = bonusRolls.slice(0, bonusType === BONUS_TYPE.STRIKE ? 2 : 1);
            }

            if (bonusRolls.length === bonusType) { // if enough bonus rolls have been made
                return {
                    ...frame,
                    frameScore: rollsScore(is10thFrame ? [...rolls] : [...rolls, ...bonusRolls]) // in 10th frame, just add all 3 roles
                };
            }
        }

        return frame;
    });
}

export const calculateAccruedFrameScores = frames => {
    return frames.map((frame, frameIndex) => {
        const { accruedFrameScore, frameScore } = frame;

        // if accrued frame score frame score has been calculated already OR frame score has NOT been calculated yet, skip it
        if (accruedFrameScore !== null || frameScore === null) {
            return frame;
        }

        return {
            ...frame,
            accruedFrameScore: frameScore + (frames[frameIndex - 1]?.accruedFrameScore ?? 0)
        };
    });
}

export const setCurrentFrame = frames => {
    const { frameNum, rolls, bonusType } = getCurrentFrame(frames);
    const newCurrentFrameNum = frameNum + 1;
    const maxRolls = getMaxRolls.bind(null, frameNum === TOTAL_FRAMES, !!bonusType);

    // if rolls have NOT exceeded the max for this frame, this is still current frame
    if (rolls.length < maxRolls()) {
        return frames;
    }

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

export const deriveTotalScore = frames => {
    return frames.reduce((totalScore, { accruedFrameScore }) => {
        return accruedFrameScore ?? totalScore;
    }, null);
};
