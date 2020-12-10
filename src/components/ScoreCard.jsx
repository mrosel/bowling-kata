import React from 'react';
import PropTypes from 'prop-types';

import { framesSelector, totalScoreSelector } from '../redux/selectors';

const ScoreCard = ({ state }) => {
    const frames = framesSelector(state);
    const totalScore = totalScoreSelector(state);

    return (
        <div className="score-card">
            {frames.map(({ frameNum, rolls, frameScore, isCurrent }) => {
                return (
                    <div className={`frame ${isCurrent ? 'is-current' : ''}`}>
                        <div className="heading">{frameNum}</div>
                        <div className="rolls">

                        </div>

                    </div>
                )
            })}
            <div>TOTAL: {totalScore}</div>
        </div>
    );
};

ScoreCard.propTypes = {};

export default ScoreCard;
