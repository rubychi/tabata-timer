import { RESET_PRESET, CHANGE_ACTIVE_PRESET } from './';

export default function signOut() {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: RESET_PRESET });
    dispatch({ type: CHANGE_ACTIVE_PRESET, payload: 'Default' });
  };
}
