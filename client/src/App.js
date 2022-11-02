import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks'
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
      <div className='App' >
    <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/searchBooks' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route exact path ='/login'/>
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      <Footer />
    </Router>
    </div>
    </ApolloProvider>
  
  );
}

export default App;
