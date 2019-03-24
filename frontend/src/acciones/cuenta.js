import { CUENTA } from './tipos';
import { BACKEND } from '../config';

export const fetchFromAccount = ({
  endpoint,
  options,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE
}) => dispatch => {
  dispatch({ type: FETCH_TYPE });

  return fetch(`${BACKEND.ADDRESS}/cuenta/${endpoint}`, options)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: ERROR_TYPE, message: json.message });
      } else {
        dispatch({ type: SUCCESS_TYPE, ...json });
      }
    })
    .catch(error => dispatch({
      type: ERROR_TYPE, message: error.message
    }));
}

export const signup = ({ username, password }) => fetchFromAccount({
  endpoint: 'signup',
  options: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  FETCH_TYPE: CUENTA.FETCH,
  ERROR_TYPE: CUENTA.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA.FETCH_SUCCESS
});

export const login = ({ username, password }) => fetchFromAccount({
  endpoint: 'login',
  options: {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  },
  FETCH_TYPE: CUENTA.FETCH,
  ERROR_TYPE: CUENTA.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA.FETCH_SUCCESS
});

export const logout = () => fetchFromAccount({
  endpoint: 'logout',
  options: { credentials: 'include' },
  FETCH_TYPE: CUENTA.FETCH,
  ERROR_TYPE: CUENTA.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA.FETCH_LOGOUT_SUCCESS
});

export const fetchAuthenticated = () => fetchFromAccount({
  endpoint: 'autenticado',
  options: { credentials: 'include' },
  FETCH_TYPE: CUENTA.FETCH,
  ERROR_TYPE: CUENTA.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA.FETCH_AUTHENTICATED_SUCCESS
});