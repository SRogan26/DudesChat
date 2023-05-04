import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginSignUp from "./pages/LoginSignUp";
import { Token } from "graphql";
import Dashboard from "./pages/Dashboard";

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem("auth_token");

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/dash" element={<Dashboard />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
