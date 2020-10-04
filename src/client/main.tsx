import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WelcomeLanding from './components/welcome/welcomeLanding';



// import './style.css';


let elem;
let isLoggedIn = location.pathname !== '/welcome';
// let isLoggedIn = true;
if (isLoggedIn) {
  
  elem = (
      <App />
  );
} else {
  elem = <WelcomeLanding />; //; <Welcome />
}


ReactDOM.render(elem, document.getElementById('root'));

