import axios from 'axios';
import {
  ROOT_URL,
} from './';

export default function signIn({ email, password }, callback) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${ROOT_URL}/signin`, { email, password });
      localStorage.setItem('token', res.data.token);
      callback();
    } catch(response) {
      callback(response);
    }
  }
}
