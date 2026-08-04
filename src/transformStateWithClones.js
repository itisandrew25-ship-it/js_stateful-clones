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
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        result.push(copyState);
        break;

      case 'clear':
        copyState = {};
        result.push(copyState);
        break;

      case 'removeProperties':
        const nextState = {};

        for (const key in copyState) {
          if (!action.keysToRemove.includes(key)) {
            nextState[key] = copyState[key];
          }
        }

        copyState = nextState;
        result.push(copyState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
