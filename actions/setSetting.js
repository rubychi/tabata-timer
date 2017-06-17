import { SET_SETTING } from './';

export function setSetting(payload) {
  return {
    type: SET_SETTING,
    payload,
  };
}
