import { SET_TITLES } from './';

export default function setTitles(payload) {
  return {
    type: SET_TITLES,
    payload,
  };
}
