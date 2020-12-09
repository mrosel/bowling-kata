import React from 'react';
import PropTypes from 'prop-types';

// import { MAX_ROLL_SCORE } from '../constants';
import { currentFrameSelector } from '../redux/selectors';
import { scoreRoll } from '../redux/actions';
import { availableScoreRollButtons } from '../logic';

const ScoringButtons = ({ state, dispatch }) => {
    const currentFrame = currentFrameSelector(state);
    if (!currentFrame) return null;

    // const totalButtons = (MAX_ROLL_SCORE - rollScore(currentFrame.rolls)) + 1; // include button for 0 pins rolled
    // console.log('currentFrame:', currentFrame, 'rollScore:', rollScore(currentFrame.rolls));
    const scoreRollButtons = availableScoreRollButtons(currentFrame.rolls);

    return (
        <div className="scoring-buttons">
            {new Array(scoreRollButtons).fill().map((value, rollScore) =>
                <button className="scoring-button" key={rollScore} onClick={() => { dispatch(scoreRoll(rollScore)) }}>{rollScore}</button>
            )}
        </div>
    );
};

ScoringButtons.propTypes = {

};

export default ScoringButtons;
