import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SignUp } from './signUp/signUp';
import { LogIn } from './logIn/logIn';



const WelcomeLanding = () => {
  return (
    
    <Router basename="/welcome">
      <div>
        <h1>Welcome</h1>
        <Route exact path="/register" component={SignUp} />
        <Route path="/log-in" component={ LogIn } />;
      </div>
    </Router>   
  );
};

export default WelcomeLanding;
