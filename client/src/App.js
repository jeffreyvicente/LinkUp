import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
import LoginLanding from './components/Landing'; 
import Home from './pages/Home';

import Events from './pages/Events';
import Profile from './pages/Profile';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return(
  <ApolloProvider client = {client}>
    <Router>
      <div>
        <Navigation/>
        <div className=''>
          <Routes>
            <Route
              path = "/"
              element= {<Home/>}
              />
            <Route
              path = "/landing"
              element = {<LoginLanding/>}
              />
            <Route 
                path="/me"
                element={<Profile />}
              />
              <Route 
                path="/profiles/:username"
                element={<Profile />}
              />
            <Route 
              path="/events/:eventId"
              element={<Events />}
              />
           

          </Routes>

        </div>
      </div>

    </Router>


  </ApolloProvider>
  );
}


export default App;
