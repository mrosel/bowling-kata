import * as TYPES from '../actions/types';

export const initialState = {


};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SCORE_PINS:
            return {};
        case TYPES.RESET_GAME:
            return {};
        default:
            return state;
    }
}

export default reducer;