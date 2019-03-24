import { fetchFromAccount } from './cuenta';
import { CUENTA_INFO } from './tipos';

export const fetchAccountInfo = () => fetchFromAccount({
  endpoint: 'info',
  options: { credentials: 'include' },
  FETCH_TYPE: CUENTA_INFO.FETCH,
  ERROR_TYPE: CUENTA_INFO.FETCH_ERROR,
  SUCCESS_TYPE: CUENTA_INFO.FETCH_SUCCESS
});