import { CUENTA } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const CUENTA_DEFAULT = { loggedIn: false };

const cuenta = (state = CUENTA_DEFAULT, action) => {
  switch(action.type) {
    case CUENTA.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case CUENTA.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message }
    case CUENTA.FETCH_SUCCESS:
      return {
        ...state,
        status: recuperarEstados.success,
        message: action.message,
        loggedIn: true
      };
    case CUENTA.FETCH_LOGOUT_SUCCESS:
      return {
        ...state,
        status: recuperarEstados.success,
        message: action.message,
        loggedIn: false
      };
    case CUENTA.FETCH_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        status: recuperarEstados.success,
        message: action.message,
        loggedIn: action.autenticado
      };
    default:
      return state;
  }
};

export default cuenta;