import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer, { initialState } from '../redux/reducers';
import ScoringButtons from './ScoringButtons';
import ScoreCard from './ScoreCard';

const initState = initialState();

const Game = props => {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <div>
            <ScoringButtons state={state} dispatch={dispatch} />
            <ScoreCard />
        </div>
    );
};

Game.propTypes = {

};

export default Game;
