import React from 'react';
import PropTypes from 'prop-types';

import { scoreButtonsSelector } from '../redux/selectors';
import { scoreRoll } from '../redux/actions';

const ScoringButtons = ({ state, dispatch }) => {
    const scoreButtons = scoreButtonsSelector(state);
    if (!scoreButtons) return null;

    return (
        <div className="score-buttons">
            {new Array(scoreButtons).fill().map((value, rollScore) =>
                <button className="score-button" key={rollScore} onClick={() => { dispatch(scoreRoll(rollScore)) }}>{rollScore}</button>
            )}
        </div>
    );
};

ScoringButtons.propTypes = {};

export default ScoringButtons;
