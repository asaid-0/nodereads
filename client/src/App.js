import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/adminViews/Dashboard';
import Home from './components/userViews/Home';
import SearchResult from './components/userViews/SearchResult';
import Books from './components/userViews/Books';
import Book from './components/userViews/Book.jsx';
import Authors from './components/userViews/Authors';
import Categories from './components/userViews/Categories';
import AdminBooks from './components/adminViews/AdminBooks';
import AdminAuthors from './components/adminViews/AdminAuthors';
import AuthorForm from './components/adminViews/AuthorForm';
import BookForm from './components/adminViews/BookForm';
import { UserRoute, AdminRoute } from './components/authComponents/authRoutes';
import { Login, Register } from './components/authComponents/guestComponents';
import { UserContext } from './components/authComponents/authContext';

function App() {

  const [user, setUser] = useState(null);
  const userObject = useMemo(() => ({ user, setUser }), [user, setUser]);


  return (
    <>
      <Router>
        <UserContext.Provider value={userObject}>
          <UserRoute exact path="/home" component={Home} />
          <UserRoute exact path="/home/search/:searchInput" component={SearchResult} />
          <UserRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />


          <UserRoute exact path="/books" component={Books} />
          <UserRoute exact path="/books/:bookId" component={Book} />

          <UserRoute exact path="/authors" component={Authors} />
        </UserContext.Provider>

        <UserRoute exact path="/categories" component={Categories} />

        <AdminRoute exact path="/admin" component={Dashboard} />
        <AdminRoute exact path="/admin/books" component={AdminBooks} />
        <AdminRoute exact path="/admin/books/add" component={BookForm} />
        <AdminRoute exact path="/admin/books/edit/:bookId" component={BookForm} />
        <AdminRoute exact path="/admin/authors" component={AdminAuthors} />
        <AdminRoute exact path="/admin/authors/add" component={AuthorForm} />
        <AdminRoute exact path="/admin/authors/edit/:authorId" component={AuthorForm} />

      </Router>
    </>
  );
}

export default App;
