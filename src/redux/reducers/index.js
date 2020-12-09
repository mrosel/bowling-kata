
import { TOTAL_FRAMES } from '../../constants';
import * as TYPES from '../actions/types';
import { currentFrameSelector } from '../selectors';
import { recordRollScore } from '../../logic';


export const initialState = () =>  {
    const state = {
        frames: new Array(TOTAL_FRAMES).fill().map((value, index) => ({
            frameNum: index + 1,
            rolls: [],
            bonusType: null,
            score: null,
            scoreIsFinalized: false,
            isCurrent: index === 0,

        })),
        rolls: [],
        totalScore: null,
    };

    console.log('state:', state)
    return state;
};

const scoreRoll = (state, rollScore) => {
    const currentFrame = currentFrameSelector(state);
    const roll = {rollScore};

    const updatedFrame = Object.assign({}, currentFrame, {
        rolls: [...currentFrame.rolls]
    });

    // push rollScore to frame.rolls
    // if score is 10, set bonusType
    //

    console.log('updatedFrame:', updatedFrame)
    return state;
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