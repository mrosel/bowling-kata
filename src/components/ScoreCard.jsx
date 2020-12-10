import React from 'react';
import PropTypes from 'prop-types';

import { totalScoreSelector } from '../redux/selectors';

const ScoreCard = ({ state }) => {
    const totalScore = totalScoreSelector(state);

    return (
        <div>
            ScoreCard... TOTAL: {totalScore}
        </div>
    );
};

ScoreCard.propTypes = {};

export default ScoreCard;
