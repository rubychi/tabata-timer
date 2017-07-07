import axios from 'axios';
import {
  ROOT_URL,
} from './';

export default function savePresets(presets) {
  return async function (dispatch) {
    try {
      const res = await axios.patch(`${ROOT_URL}/presets`, presets, { headers: { 'x-auth': localStorage.getItem('token') }});
    } catch(response) {
      console.log(response);
    }
  }
}
