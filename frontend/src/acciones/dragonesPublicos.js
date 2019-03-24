import { DRAGONES_PUBLICOS } from './tipos';
import { BACKEND } from '../config';

export const fetchPublicDragons = () => dispatch => {
  dispatch({ type: DRAGONES_PUBLICOS.FETCH });

  return fetch(`${BACKEND.ADDRESS}/dragon/dragones-publicos`)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: DRAGONES_PUBLICOS.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: DRAGONES_PUBLICOS.FETCH_SUCCESS, dragones: json.dragones });
      }
    })
    .catch(error => dispatch({ type: DRAGONES_PUBLICOS.FETCH_ERROR, message: error.message }));
}