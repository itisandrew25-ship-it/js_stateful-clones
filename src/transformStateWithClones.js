'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      copyState = { ...copyState, ...action.extraData };
      result.push(copyState);
    }

    if (action.type === 'clear') {
      copyState = {};
      result.push(copyState);
    }

    if (action.type === 'removeProperties') {
      const nextState = {};

      for (const key in copyState) {
        if (!action.keysToRemove.includes(key)) {
          nextState[key] = copyState[key];
        }
      }

      copyState = nextState;
      result.push(copyState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
