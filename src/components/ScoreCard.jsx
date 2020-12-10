import React from 'react';
import PropTypes from 'prop-types';

import { TOTAL_FRAMES } from '../constants';
import { framesSelector, totalScoreSelector } from '../redux/selectors';

const ScoreCard = ({ state }) => {
    const frames = framesSelector(state);
    const totalScore = totalScoreSelector(state);

    return (
        <div className="score-card">
            {frames.map(({ frameNum, rolls, accruedFrameScore, isCurrent }) => {
                return (
                    <div key={`f${frameNum}`} className={`frame ${isCurrent ? 'is-current' : ''}`}>
                        <div className="heading">{frameNum}</div>
                        <div className="rolls">
                            {Array(frameNum === TOTAL_FRAMES ? 3 : 2).fill().map((value, rollIndex) => {
                                return (
                                    <div key={`f${frameNum}r${rollIndex}`} className="roll">{rolls[rollIndex] ?? ' '}</div>
                                );
                            })}
                        </div>
                        <div className="score">{accruedFrameScore}</div>
                    </div>
                )
            })}
            <div className="frame">
                <div className="heading">TOTAL</div>
                <div className="total-score">{totalScore}</div>
            </div>
        </div>
    );
};

ScoreCard.propTypes = {};

export default ScoreCard;
