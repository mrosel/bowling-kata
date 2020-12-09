import { getCurrentFrame, availableScoreButtons } from '../../logic';

export const currentFrameSelector = state => getCurrentFrame(state.frames);

export const scoreButtonsSelector = state => {
    const currentFrame = getCurrentFrame(state.frames);
    if (!currentFrame) return null;

    return availableScoreButtons(currentFrame);
};