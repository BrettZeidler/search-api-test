import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss';
import App from './App';
import CryptoJS from 'crypto-js';
import {
  	ApolloClient,
  	InMemoryCache,
  	ApolloProvider
} from "@apollo/client";

const gatherToken = () => {
	var bytes = CryptoJS.AES.decrypt(`${process.env.REACT_APP_BEARER_TOKEN}`, 'a-key-to-use');
	var token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	return token;
}

const client = new ApolloClient({
  	uri: 'https://api.github.com/graphql',
  	cache: new InMemoryCache(),
  	headers: {
    	authorization: `bearer ${gatherToken()}`
  	}
});

ReactDOM.render(
  	<ApolloProvider client={client}>
   	 	<App />
  	</ApolloProvider>,
  	document.getElementById('root')
);
