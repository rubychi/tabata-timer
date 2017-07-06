import {
  SIGN_UP,
  ROOT_URL,
} from './';

export async function signup({ email, password }) {
  await axios.post(`${ROOT_URL}/signup`, { email, password });
  // return {
  //   type: SET_SETTING,
  //   payload,
  // };
}
