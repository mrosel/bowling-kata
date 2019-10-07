 
export function gameLogic(state, id) {
  const scoreBoard = state.bowls.map((bowl) => {
    let score = { frame: bowl.frame, score: bowl.pins }
    return score;
  });

  return { scoreBoard };
}

export function addScore(state, bowl) {
  const newBowl = Object.assign({}, bowl, {
    pins: 10, bonus: 0
  });

  return {
    scoreBoard: state.bowls.concat([newBowl])
  };
}
