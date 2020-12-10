import { getCurrentFrame, availableScoreButtons } from '../../logic';

export const scoreButtonsSelector = state => {
    const currentFrame = getCurrentFrame(state.frames);
    if (!currentFrame) return null;

    return availableScoreButtons(currentFrame);
};

export const framesSelector = state => state.frames;

export const totalScoreSelector = state => state.totalScore;