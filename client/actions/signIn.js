import axios from 'axios';
import {
  ROOT_URL,
  SET_PRESET,
} from './';

export default function signIn({ email, password }, callback) {
  return async function (dispatch) {
    try {
      let res = await axios.post(`${ROOT_URL}/signin`, { email, password });
      localStorage.setItem('token', res.data.token);
      res = await axios.get(`${ROOT_URL}/presets`, { headers: { 'x-auth': res.data.token }});
      dispatch({
        type: SET_PRESET,
        payload: res.data.presets,
      });
      callback();
    } catch(response) {
      callback(response);
    }
  }
}
