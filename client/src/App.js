import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
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

const resetToken = onError(({ networkError }) => {
  console.log(networkError)
  if (
    networkError &&
    networkError.name === "ApolloError" &&
    networkError.statusCode === 401
  ) {
    console.log('It did the thing')
    localStorage.removeItem("auth_token");
    window.location.reload()
  }
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
