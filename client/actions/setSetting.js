import { SET_SETTING } from './';

export default function setSetting(payload) {
  return {
    type: SET_SETTING,
    payload,
  };
}
