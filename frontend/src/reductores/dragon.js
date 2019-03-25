import { DRAGON } from '../acciones/tipos';
import recuperarEstados from './recuperarEstados';

const DRAGON_DEFAULT = {
  dragonId: '',
  nickname: '',
  generacionId: '',  
  isPublic: false,
  saleValue: 0,
  sireValue: 0,   
  nacimientofecha: '',
  rasgos: []
};

const dragon = (state = DRAGON_DEFAULT, action) => {
  switch(action.type) {
    case DRAGON.FETCH:
      return { ...state, status: recuperarEstados.fetching };
    case DRAGON.FETCH_ERROR:
      return { ...state, status: recuperarEstados.error, message: action.message };
    case DRAGON.FETCH_SUCCESS:
      return { ...state, status: recuperarEstados.success, ...action.dragon };
    default:
      return state;
  };
};

export default dragon;