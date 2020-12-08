import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import Reducers, { initialState } from '../redux/reducers';
import ScoringButtons from './ScoringButtons';
import ScoreCard from './ScoreCard';

const Game = props => {
    const [state, dispatch] = useReducer(initialState);

    return (
        <div>
            <ScoringButtons />
            <ScoreCard />
        </div>
    );
};

Game.propTypes = {

};

export default Game;
