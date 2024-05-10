import './App.css';
import Taskr from './pages/home'

import { Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});
//This will set up the request middleware that will add the token to the request's headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//This will create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//This will render the application
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
       
          <Nav />
          <Outlet />
       
      </div>
    </ApolloProvider>
  );
}

export default App; 
