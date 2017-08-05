import axios from 'axios';

export function fetchUser() {
  const request = axios.get('http://jsonplaceholder.typicode.com/users');

  return (dispatch) => {
    // in case of error Uncaught (in promise) TypeError: this.props.users.map is not a function
    // check (data) should be ({data})
    //request.then((data) => {
    request.then(({data}) => {
      dispatch({ type: 'FETCH_PROFILES', payload: data })
    });

  };
}
