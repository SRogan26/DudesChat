import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const UseLogIn = (token) => {
  localStorage.setItem("auth_token", token);
};

export const UseIsLoggedIn = () => {
  const wasLogged = localStorage.getItem("auth_token") ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(wasLogged);

  useEffect(() => {
    const userToken = localStorage.getItem("auth_token");
    if (userToken) {
      const user = jwt_decode(userToken);
      const convertedNow = Date.now() / 1000;
      if (user.exp < convertedNow && wasLogged) {
        setIsLoggedIn(false);
        localStorage.removeItem("auth_token");
        console.log('it nuked it')
      }
    } else if (wasLogged && isLoggedIn) setIsLoggedIn(false);
  }, []);
  console.log(isLoggedIn);
  return isLoggedIn;
};
