import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVnFthOIWbUuyWN1u60jBnpoRRwj_JY0U",
    authDomain: "evernote-clone-81d64.firebaseapp.com",
    databaseURL: "https://evernote-clone-81d64.firebaseio.com",
    projectId: "evernote-clone-81d64",
    storageBucket: "evernote-clone-81d64.appspot.com",
    messagingSenderId: "268926128810",
    appId: "1:268926128810:web:3cf0b03bde1a26d68f36d3",
    measurementId: "G-ESSV38NZM2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
