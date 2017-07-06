import { ADD_PRESET } from './';

export function addPreset(payload) {
  return {
    type: ADD_PRESET,
    payload,
  };
}
