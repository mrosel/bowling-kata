import React, { Fragment, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from '../redux/reducers';
import ScoreButtons from './ScoreButtons';
import ScoreCard from './ScoreCard';

const initState = initialState();

const Game = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <Fragment>
            <ScoreButtons state={state} dispatch={dispatch} />
            <ScoreCard state={state} />
        </Fragment>
    );
};

Game.propTypes = {};

export default Game;
