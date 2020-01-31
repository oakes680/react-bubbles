import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import BubblePage from './components/BubblePage'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <Link to='/'>Login</Link>
      <Link to='/bubblepage'>Bubble Page</Link>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ProtectedRoute path="/bubblepage"  component={BubblePage}/>


      </div>
    </Router>
  );
}

export default App;
