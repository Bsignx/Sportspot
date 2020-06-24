import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CreateClass from './pages/CreateClass';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={CreateClass} exact path="/create-class" />
    </BrowserRouter>
  );
};

export default Routes;
