import { DELETE_PRESET } from './';

export function deletePreset(payload) {
  return {
    type: DELETE_PRESET,
    payload,
  };
}
