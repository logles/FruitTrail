import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
  headers: () => {
    const token = localStorage.getItem('id_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
});

export const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
