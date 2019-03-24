import { CUENTA_DRAGONES } from './tipos';
import { fetchFromAccount } from './cuenta';

export const fetchAccountDragones = () => fetchFromAccount({
  endpoint: 'dragones',
  options: { credentials: 'include' },
  FETCH_TYPE: CUENTA_DRAGONES.FETCH,
  ERROR_TYPE: CUENTA_DRAGONES.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA_DRAGONES.FETCH_SUCCESS
});