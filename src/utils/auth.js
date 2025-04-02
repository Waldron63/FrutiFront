import Cookies from 'js-cookie';

const duracion = 2 / 24;

export const setAuthSession = (user) => {
  Cookies.set('user', JSON.stringify(user), { expires: duracion });
};

export const getUserInfo = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
};

export const removeAuthSession = () => {
  Cookies.remove('user');
};

export const isAuthenticated = () => {
  return !!Cookies.get('user');
};
