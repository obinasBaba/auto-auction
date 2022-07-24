import Cookies from 'js-cookie';
import { USER_TOKEN } from '@/const';

export const getUserToken = () => {
  return sessionStorage.getItem(USER_TOKEN);
};

export const setUserToken = (token: string) => {
  return sessionStorage.setItem(USER_TOKEN, token);
};
