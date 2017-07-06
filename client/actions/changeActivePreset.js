import { CHANGE_ACTIVE_PRESET } from './';

export function changeActivePreset(payload) {
  return {
    type: CHANGE_ACTIVE_PRESET,
    payload,
  };
}
