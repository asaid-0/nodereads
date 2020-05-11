import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/adminViews/Dashboard';

import Home from './components/userViews/Home';
import Books from './components/userViews/Books';
import Book from './components/userViews/Book';
import Authors from './components/userViews/Authors';
import Categories from './components/userViews/Categories';




function App() {
  return (
    <>
      <Router>
        <Route exact path="/home" component={Home}/>

        <Route exact path="/" component={Home} />


        <Route exact path="/books" component={Books}/>
        <Route exact path="/books/:bookId" component={Book} />

        <Route exact path="/authors" component={Authors}/>


        <Route exact path="/categories" component={Categories}/>

        <Route exact path="/admin" component={Dashboard}/>
      </Router>
    </>
  );
}

export default App;
