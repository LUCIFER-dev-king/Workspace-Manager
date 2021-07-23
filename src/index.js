import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const jwt = JSON.parse(localStorage.getItem("jwt"));
var token;
if (jwt) {
  token = jwt.token;
}
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND,
});

const authorizationLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  // link: authorizationLink.concat(httpLink),
  link: concat(authMiddleware, httpLink),
  // uri: process.env.REACT_APP_BACKEND,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
