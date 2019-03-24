import { CUENTA_DRAGONES } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const CUENTA_DRAGONES_DEFAULT = { dragones: [] };

const cuentaDragones = (state = CUENTA_DRAGONES_DEFAULT, action) => {
  switch(action.type) {
    case CUENTA_DRAGONES.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case CUENTA_DRAGONES.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message };
    case CUENTA_DRAGONES.FETCH_SUCCESS:
      return {
        ...state,
        status: recuperarEstados.success,
        message: action.message,
        dragons: action.dragons
      };
    default:
      return state;
  }
}

export default cuentaDragones;