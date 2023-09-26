import Grid from "@mui/material/Grid";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/userContext";

export default function LoginSignUp() {
  const { userLogged, currentTheme, setCurrentTheme } = useUserContext();

  const navTo = useNavigate();
  
  if(currentTheme !== 0)setCurrentTheme(0);

  useEffect(() => {
    if (userLogged) navTo("/dash");
  }, [userLogged]);
  const styles = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <div>
      <h1 style={{textAlign:'center'}}>This Is DudesChat</h1>
      <Grid container style={styles}>
        <Grid item xs={12} md={5}>
          <Login />
        </Grid>
        <Grid item xs={12} md={2} textAlign="center">
          <h2>OR</h2>
        </Grid>
        <Grid item xs={12} md={5}>
          <SignUp />
        </Grid>
      </Grid>
    </div>
  );
}
