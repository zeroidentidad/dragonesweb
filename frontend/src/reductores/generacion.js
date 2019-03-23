import { GENERACION } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const GENERACION_DEFAULT = { generacionId: '', expiracion: '' };

const generacion = (state = GENERACION_DEFAULT, action) => {
  switch(action.type) {
    case GENERACION.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case GENERACION.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message };
    case GENERACION.FETCH_SUCCESS:
      return { ...state, status: recuperarEstados.success, ...action.generacion };
    default:
      return state;
  }
}

export default generacion;