import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss';
import App from './App';
import {
  	ApolloClient,
  	InMemoryCache,
  	ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  	uri: 'https://api.github.com/graphql',
  	cache: new InMemoryCache(),
  	headers: {
    	authorization: `bearer ${process.env.REACT_APP_BEARER_TOKEN}`
  	}
});

ReactDOM.render(
  	<ApolloProvider client={client}>
   	 	<App />
  	</ApolloProvider>,
  	document.getElementById('root')
);
