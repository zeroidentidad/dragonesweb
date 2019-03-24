import { DRAGONES_PUBLICOS } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const DRAGONES_PUBLICOS_DEFAULT = { dragones: [] };

const dragonesPublicos = (state = DRAGONES_PUBLICOS_DEFAULT, action) => {
  switch(action.type) {
    case DRAGONES_PUBLICOS.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case DRAGONES_PUBLICOS.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message };
    case DRAGONES_PUBLICOS.FETCH_SUCCESS:
      return { ...state, status: recuperarEstados.success, dragones: action.dragones };
    default:
      return state;
  }
};

export default dragonesPublicos;