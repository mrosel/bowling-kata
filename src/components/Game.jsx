import React, { Fragment, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from '../redux/reducers';
import ScoreCard from './ScoreCard';
import ScoreButtons from './ScoreButtons';
import ResetButton from './ResetButton';

const initState = initialState();

const Game = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <div className="game">
            <ScoreCard state={state} />
            <ResetButton state={state} dispatch={dispatch} />
            <ScoreButtons state={state} dispatch={dispatch} />
        </div>
    );
};

Game.propTypes = {};

export default Game;
