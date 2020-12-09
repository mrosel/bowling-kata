import { getCurrentFrame, availableScoreRollButtons } from '../../logic';

export const currentFrameSelector = state => getCurrentFrame(state.frames);

export const scoreRollButtonsSelector = state => {
    const currentFrame = getCurrentFrame(state.frames);
    if (!currentFrame) return null;

    return availableScoreRollButtons(currentFrame.rolls);
};