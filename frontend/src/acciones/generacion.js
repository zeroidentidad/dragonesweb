import { GENERACION } from './tipos';
import { BACKEND } from '../config';

export const recuperarGeneracion = () => dispatch => {
  dispatch({ type: GENERACION.FETCH });

  // no pude usar terminos en español con response, type, message
  return fetch(`${BACKEND.ADDRESS}/generacion`)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({
          type: GENERACION.FETCH_ERROR,
          message: json.message
        });
      } else {
        dispatch({
          type: GENERACION.FETCH_SUCCESS,
          generacion: json.generacion
        });
      }
    })
    .catch(error => dispatch({
      type: GENERACION.FETCH_ERROR,
      message: error.message
    }));
};