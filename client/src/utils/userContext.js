import { useContext, createContext, useState, useEffect } from "react";
import { UseIsLoggedIn } from "./authenticate";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(UseIsLoggedIn());

  // useEffect(()=>{
  //   const isLogged = UseIsLoggedIn()
  //   setUserLogged(isLogged)
  // }, [userLogged])

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
