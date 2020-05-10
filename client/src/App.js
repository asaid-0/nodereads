import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';




function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route exact path="/home" >
          <h1> Home </h1>
        </Route>

        <Route exact path="/" >
          <h1> Landing Page </h1>
        </Route>

        <Route exact path="/books" >
          <h1> All books </h1>
        </Route>

        <Route exact path="/authors" >
          <h1> Authors </h1>
        </Route>

        <Route exact path="/categories" >
          <h1> Categories </h1>
        </Route>
        <Route exact path="/admin" >
          <Dashboard />
        </Route>
      </Router>
    </>
  );
}

export default App;
