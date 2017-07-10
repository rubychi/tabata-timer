import axios from 'axios';
import {
  ROOT_URL,
  SET_PRESET,
} from './';

export default function authSignUpNSignIn(presets) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${ROOT_URL}/presets`, presets, { headers: { 'authorization': token }});
      const res = await axios.get(`${ROOT_URL}/presets`, { headers: { 'authorization': token }});
      dispatch({
        type: SET_PRESET,
        payload: res.data.presets,
      });
    } catch({ response }) {
      console.log(response.data.error);
    }
  }
}
