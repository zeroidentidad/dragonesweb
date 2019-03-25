import { combineReducers } from 'redux';
import generacion from './generacion';
import dragon from './dragon';
import cuenta from './cuenta';
import cuentaDragones from './cuentaDragones';
import cuentaInfo from './cuentaInfo';
import dragonesPublicos from './dragonesPublicos';

export default combineReducers({
  cuenta,
  dragon,
  generacion,
  cuentaDragones,
  cuentaInfo,
  dragonesPublicos
});