import Cookies from 'js-cookie';

const duracion = 2 / 24;

export const setAuthSession = (user) => {
  Cookies.set('user', JSON.stringify(user), { expires: duracion });
};

export const getUserInfo = () => {
  const user = Cookies.get('user');
  // Si no hay usuario en cookies, devolvemos un objeto de usuario predeterminado para desarrollo
  if (!user) {
    return {
      id: 841,
      name: "MAPU",
      mail: "MAPU@MAIL.COM",
      password: "*",
      rol: "admin"
    };
  }
  return JSON.parse(user);
};

export const removeAuthSession = () => {
  Cookies.remove('user');
};

export const isAuthenticated = () => {
  return !!Cookies.get('user');
};