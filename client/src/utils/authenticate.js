import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export const UseLogIn = (token) => {
  localStorage.setItem("auth_token", token);
};

export const UseIsLoggedIn = () => {
  console.log(localStorage.getItem("auth_token"));
  const wasLogged = localStorage.getItem("auth_token") ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(wasLogged);

  useEffect(() => {
    const userToken = localStorage.getItem('auth_token');
    if (userToken) {
      const user = jwt_decode(userToken);
      if (user.exp > Date.now() && wasLogged) {
        setIsLoggedIn(false);
        localStorage.setItem('auth_token', null);
      }
    } else if (wasLogged && isLoggedIn) setIsLoggedIn(false);
  }, []);
  console.log(isLoggedIn);
  return isLoggedIn;
};

const Auth = {};

Auth.logIn = (data) => {
  const token = data.addUser.authToken;
  localStorage.setItem('auth_token', token);
};
