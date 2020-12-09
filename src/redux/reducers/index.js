
import { TOTAL_FRAMES } from '../../constants';
import * as TYPES from '../actions/types';
import { currentFrameSelector } from '../selectors';
import { calculateFrameScores, recordRollScore } from '../../logic';

export const initialState = () =>  {
    const state = {
        frames: new Array(TOTAL_FRAMES).fill().map((value, index) => ({
            frameNum: index + 1,
            rolls: [],
            bonusType: null,
            bonusRolls: [],
            frameScore: null,
            accruedFrameScore: null,
            isCurrent: index === 0,

        })),
        totalScore: null,
    };

    return state;
};

const scoreRoll = (state, rollScore) => {
    const currentFrame = currentFrameSelector(state);
    // const roll = {rollScore};

    let frames = recordRollScore(currentFrame, rollScore, state.frames);
    frames = calculateFrameScores(frames);


    // push rollScore to frame.rolls
    // if score is 10, set bonusType
    // push updated frame back into frames???
    //
    // iterate all frames where score is NOT finalized and have at least 1 roll
    //
    // set next current frame

    // console.log('updatedFrame:', updatedFrame)
    return {
        ...state,
        frames
    };
};

const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case TYPES.SCORE_ROLL:
            console.log('score_roll:', action)
            return scoreRoll(state, action.rollScore);
        case TYPES.RESET_GAME:
            return initialState();
        default:
            return state;
    }
}

export default reducer;