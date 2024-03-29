import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "../utils/userContext";
import LoginSignUp from "./LoginSignUp";
import Dashboard from "./Dashboard";

export default function PageRouter() {
  const { userLogged, theme } = useUserContext();

  const LoggedRoutes = () => {
    return (
      <Routes>
        <Route path="/dash" element={<Dashboard />} />
        <Route path="*" element={<Navigate to={"/dash"} />} />
      </Routes>
    );
  };

  const UnloggedRoutes = () => {
    return (
      <Routes>
        <Route path="/hello" element={<LoginSignUp />} />
        <Route path="*" element={<Navigate to={"/hello"} />} />
      </Routes>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>{userLogged ? <LoggedRoutes /> : <UnloggedRoutes />}</Router>
    </ThemeProvider>
  );
}
