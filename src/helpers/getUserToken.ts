import Cookies from 'js-cookie';
import { USER_TOKEN } from '@/const';

const getUserToken = () => {
  return Cookies.get(USER_TOKEN);
};

export default getUserToken;
