import { ADD_PRESET } from './';

export default function addPreset(payload) {
  return {
    type: ADD_PRESET,
    payload,
  };
}
