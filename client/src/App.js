import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import LoginSignUp from './pages/LoginSignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
