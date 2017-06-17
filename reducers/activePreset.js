import { CHANGE_ACTIVE_PRESET } from '../actions';

export default function (state = 'Default', action) {
  switch (action.type) {
    case CHANGE_ACTIVE_PRESET:
      return action.payload;
    default:
      return state;
  }
}
