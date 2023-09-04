import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { Token } from "graphql";
import { UserProvider } from "./utils/userContext";
import PageRouter from "./pages/PageRouter";

const httpLink = createHttpLink({ uri: "/graphql" });

const wsLink = new GraphQLWsLink(createClient({
  url: "ws://localhost:4000/"
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

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
  link: authLink.concat(splitLink),
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
