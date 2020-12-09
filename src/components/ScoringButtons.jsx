import React from 'react';
import PropTypes from 'prop-types';

import { scoreRollButtonsSelector } from '../redux/selectors';
import { scoreRoll } from '../redux/actions';

const ScoringButtons = ({ state, dispatch }) => {
    const scoreRollButtons = scoreRollButtonsSelector(state);
    if (!scoreRollButtons) return null;

    return (
        <div className="scoring-buttons">
            {new Array(scoreRollButtons).fill().map((value, rollScore) =>
                <button className="scoring-button" key={rollScore} onClick={() => { dispatch(scoreRoll(rollScore)) }}>{rollScore}</button>
            )}
        </div>
    );
};

ScoringButtons.propTypes = {};

export default ScoringButtons;
