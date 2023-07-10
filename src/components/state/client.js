import React from 'react';
import PropTypes from 'prop-types';
import {
  ApolloClient,
  ApolloProvider as Provider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import Cookies from 'js-cookie';

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('token');
  let createHeaders = {
    headers: {
      ...headers,
    },
  };
  if (token) {
    Object.assign(createHeaders.headers, { authorization: `Bearer ${token}` });
  }
  return createHeaders;
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      // eslint-disable-next-line no-undef
      uri: process.env.HP_GRAPHQL_API_ENDPOINT,
      fetch,
      fetchOptions: {
        // mode: 'cors',
        // credentials: true,
      },
    })
  ),
});
const ApolloProvider = ({ children }) => <Provider client={client}>{children}</Provider>;

ApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApolloProvider;
