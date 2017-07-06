import { DELETE_PRESET } from './';

export default function deletePreset(payload) {
  return {
    type: DELETE_PRESET,
    payload,
  };
}
