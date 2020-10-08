import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Register } from './register/register';
import { LogIn } from './logIn/logIn';

const WelcomeLanding = () => {
  return (
    
    <Router basename="/welcome">
      <div>
        <h1>Welcome</h1>
        <Link to="/register">Register</Link>{" "}
        <Link to="/log-in">Log in</Link>
        <Route exact path="/register" component={Register} />{" "}
        <Route path="/log-in" component={ LogIn } />
      </div>
    </Router>   
  );
};

export default WelcomeLanding;
