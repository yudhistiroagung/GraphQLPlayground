/**
 * @format
 */

import React from 'react';

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ApolloApp = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => ApolloApp);
