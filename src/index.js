import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND,
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
