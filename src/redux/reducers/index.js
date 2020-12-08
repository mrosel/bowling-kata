import * as TYPES from '../actions/types';

export const initialState = () =>  {
    const state = {
        frames: new Array(10).fill().map((value, index) => ({
            frameNum: index + 1,
            rolls: [],
            // rollScore: null,
            bonusType: null,
            score: null,
            scoreIsFinalized: false,
            isCurrent: index === 0,

        })),
        totalScore: null,
    };

    console.log('state:', state)
    return state;
};



const reducer = (state = initialState(), action) => {
    switch (action.type) {
        case TYPES.SCORE_ROLL:
            console.log('score_roll:', action)
            return state;
        case TYPES.RESET_GAME:
            return initialState();
        default:
            return state;
    }
}

export default reducer;