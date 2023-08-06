import { useContext, createContext, useState, useEffect } from "react";
import { UseIsLoggedIn } from "./authenticate";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(UseIsLoggedIn());

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
