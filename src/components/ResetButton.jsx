import React from 'react';

import { currentFrameSelector } from '../redux/selectors';
import { resetGame } from '../redux/actions';

const ResetButton = ({ state, dispatch }) => {
    const currentFrame = currentFrameSelector(state);

    return (
        <div className="reset-button">
            <button onClick={() => { dispatch(resetGame()) }}>{currentFrame ? 'Reset Game' : 'New Game'}</button>
        </div>
    );
};

export default ResetButton;
