import { DRAGON } from './tipos';
import { BACKEND } from '../config';

export const recuperarDragon = () => dispatch => {
  dispatch({ type: DRAGON.FETCH });

  return fetch(`${BACKEND.ADDRESS}/dragon/nuevo`, {
    credentials: 'include'
  }).then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: DRAGON.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: DRAGON.FETCH_SUCCESS, dragon: json.dragon });
      }
    })
    .catch(error => dispatch({ type: DRAGON.FETCH_ERROR, message: error.message }));
};