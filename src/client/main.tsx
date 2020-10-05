import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WelcomeLanding from './components/welcome/welcomeLanding';



// import './style.css';


let elem;
const path = location.pathname.split('/');
console.log(path);

let isLoggedIn = path[1] !== 'welcome';

// let isLoggedIn = true;
if (isLoggedIn) {
  
  elem = (
      <App />
  );
} else {
  elem = <WelcomeLanding />; //; <Welcome />
}


ReactDOM.render(elem, document.getElementById('root'));

