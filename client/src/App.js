import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/adminViews/Dashboard';
import Book from './components/Book';
import Home from './components/userViews/Home';
import Books from './components/userViews/Books';
import Authors from './components/userViews/Authors';
import Categories from './components/userViews/Categories';
import AdminBooks from './components/adminViews/AdminBooks';
import AdminAuthors from './components/adminViews/AdminAuthors';
import AddAuthor from './components/adminViews/AddAuthor';




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
        <Route exact path="/admin/books" component={AdminBooks}/>
        <Route exact path="/admin/authors" component={AdminAuthors}/>
        <Route exact path="/admin/authors/add" component={AddAuthor}/>
      </Router>
    </>
  );
}

export default App;
