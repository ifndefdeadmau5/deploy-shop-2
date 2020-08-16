import React from "react";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import "./App.css";
import ProductDetail from "./pages/ProductDetail";

const cache = new InMemoryCache();

cache.writeData({
  data: {
    list: [],
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({ uri: "http://localhost:4000" }),
  ]),
  cache,
  resolvers: {},
});

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <ApolloProvider client={client as any}>
          <Header />
          <Layout>
            <Switch>
              <Route exact path="/">
                <Products />
              </Route>
              <Route exact path="/product">
                <ProductDetail />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
            </Switch>
          </Layout>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;
