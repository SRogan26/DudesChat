import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Token } from "graphql";
import { UserProvider } from "./utils/userContext";
import PageRouter from "./pages/PageRouter";

const httpLink = createHttpLink({ uri: "/graphql" });

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem("auth_token");

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
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
      <UserProvider>
        <PageRouter />
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
