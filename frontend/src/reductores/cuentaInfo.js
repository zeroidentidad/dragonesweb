import { CUENTA_INFO } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const cuentaInfo = (state = {}, action) => {
  switch (action.type) {
    case CUENTA_INFO.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case CUENTA_INFO.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message };
    case CUENTA_INFO.FETCH_SUCCESS:
      return {
        ...state,
        status: recuperarEstados.success,
        message: action.message,
        ...action.info
      };
    default:
      return state;
  }
}

export default cuentaInfo;