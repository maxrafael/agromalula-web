import produce from 'immer';

import { items } from '~/components/Header/menu';

const INITIAL_STATE = {
  navBar: items.dashboard.name,
};

export default function navbar(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@navbar/SET_ACTIVE_NAVBAR': {
        draft.navBar = action.payload.navBar;
        break;
      }
      case '@navbar/UNSET_ACTIVE_NAVBAR': {
        draft.navBar = items.dashboard.name;
        break;
      }
      default:
    }
  });
}
