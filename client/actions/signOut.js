export default function signOut() {
  return function (dispatch) {
    localStorage.removeItem('token');
  }
}
