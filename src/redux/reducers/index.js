
import { TOTAL_FRAMES } from '../../constants';
import * as TYPES from '../actions/types';
import {
    calculateAccruedFrameScores,
    calculateFrameScores,
    deriveTotalScore,
    recordRollScore,
    setCurrentFrame
} from '../../logic';

export const initialState = () =>  {
    const state = {
        frames: new Array(TOTAL_FRAMES).fill().map((value, index) => ({
            frameNum: index + 1,
            rolls: [],
            bonusType: null,
            frameScore: null,
            accruedFrameScore: null,
            isCurrent: index === 0,

        })),
        totalScore: null,
    };

    return state;
};

const scoreRoll = (state, rollScore) => {
    let frames = recordRollScore(rollScore, state.frames);
    frames = calculateFrameScores(frames);
    frames = calculateAccruedFrameScores(frames);
    frames = setCurrentFrame(frames);

    console.table(frames);

    return {
        ...state,
        frames,
        totalScore: deriveTotalScore(frames)
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