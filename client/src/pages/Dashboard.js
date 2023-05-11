import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";
import { UseIsLoggedIn } from "../utils/authenticate";

export default function Dashboard() {
  const [userLogged, setUserLogged] = useState(UseIsLoggedIn());
  const navTo = useNavigate();
  useEffect(() => {
    if (!userLogged) navTo("/");
  }, [userLogged]);
  const userToken = localStorage.getItem("auth_token");
  let user;
  if (userToken) user = jwt_decode(userToken);
  const userName = user?.data?.username;

  const handleLogOut = () => {
    localStorage.setItem("auth_token", "");
    setUserLogged(false);
  };
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">{userName || "Who?"}</Button>
      <Button variant="outlined" onClick={handleLogOut}>
        Log Out
      </Button>
    </Stack>
  );
}
