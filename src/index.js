import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import App from './components/App';
import { AuthProvider } from './contexts/AuthContext';
import './style.css';

const firebaseConfig = {
  apiKey: "AIzaSyCW2tW2JgflDtjhOu2md05OWqhflyswxb8",
  authDomain: "harmony-54b02.firebaseapp.com",
  databaseURL: "https://harmony-54b02-default-rtdb.firebaseio.com",
  projectId: "harmony-54b02",
  storageBucket: "harmony-54b02.appspot.com",
  messagingSenderId: "928070325820",
  appId: "1:928070325820:web:4dfbbf7c07deddab9c9539",
  measurementId: "G-F7648HFD0P"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export { auth, db };