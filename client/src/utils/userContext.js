import { useContext, createContext, useState, useEffect } from "react";
import { UseIsLoggedIn } from "./authenticate";
import jwt_decode from "jwt-decode";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(UseIsLoggedIn());
  const userToken = localStorage.getItem("auth_token");
  const user = userToken ? jwt_decode(userToken).data : null
  const [currentUser, setCurrentUser] = useState(user);


  useEffect(() => {
    if (userToken) {
      const user = jwt_decode(userToken);
      setCurrentUser(user.data)
    } else {
      setCurrentUser(null)
    }
  }, [userLogged]);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged , currentUser}}>
      {children}
    </UserContext.Provider>
  );
};
