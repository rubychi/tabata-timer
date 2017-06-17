import { SET_TITLES } from './';

export function setTitles(payload) {
  return {
    type: SET_TITLES,
    payload,
  };
}
