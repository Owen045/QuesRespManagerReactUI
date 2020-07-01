import React  from 'react';
import ApolloClient from 'apollo-boost'; // client layer for routing requests to the graphql server
import { ApolloProvider } from '@apollo/react-hooks'; // wraps react app and places the client on the context allowing it to be accessed from anywhere in component tree
import { InMemoryCache } from "apollo-cache-inmemory";
// import css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopLevelQuery from './components/topLevelQuery.js'


// external packages

// multer - multi part form tool
// Formik - build forms

const cache = new InMemoryCache();

function App () {
  const client = new ApolloClient({
          uri: process.env.REACT_APP_API_ENDPOINT,  // specify graphql server being used, in this case, dockerized hasura engine 
          cache: cache 
        })

  return (
    <ApolloProvider client={client}>
        <div className="App">

        <TopLevelQuery />
        
        </div>
      </ApolloProvider>
  )
}


export default App;
