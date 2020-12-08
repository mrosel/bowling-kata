import React from 'react';
import PropTypes from 'prop-types';

import { MAX_ROLL_SCORE } from '../constants';
import { currentFrameSelector } from '../redux/selectors';

import { rollScore } from '../logic';

const ScoringButtons = ({ state, dispatch }) => {
    const currentFrame = currentFrameSelector(state);

    if (!currentFrame) return null;

    const totalButtons = (MAX_ROLL_SCORE - rollScore(currentFrame.rolls)) + 1; // include button for 0 pins rolled
    console.log('currentFrame:', currentFrame, 'rollScore:', rollScore(currentFrame.rolls));

    return (
        <div className="scoring-buttons">
            {new Array(totalButtons).fill().map((value, rollScore) =>
                <button className="scoring-button" onClick={() => { console.log('recordScore:', rollScore) }}>{rollScore}</button>
            )}
        </div>
    );
};

ScoringButtons.propTypes = {

};

export default ScoringButtons;
