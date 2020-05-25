import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/adminViews/Dashboard';
import Home from './components/userViews/Home';
import SearchResult from './components/userViews/SearchResult';
import Books from './components/userViews/Books';
import Book from './components/userViews/Book.jsx';
import Authors from './components/userViews/Authors';
import Author from './components/userViews/Author';
import Categories from './components/userViews/Categories';
import Category from './components/userViews/CategoryCard';
import AdminBooks from './components/adminViews/AdminBooks';
import AdminAuthors from './components/adminViews/AdminAuthors';
import AuthorForm from './components/adminViews/AuthorForm';
import BookForm from './components/adminViews/BookForm';
import { UserRoute, AdminRoute } from './components/authComponents/authRoutes';
import { Login } from './components/authComponents/guestComponents';
import Register from './components/authComponents/RegisterForm';
import { UserContext } from './components/authComponents/authContext';
import AdminCategories from './components/adminViews/AdminCategories';
import CategoryForm from './components/adminViews/CategoryForm';

function App() {

  const [user, setUser] = useState();
  
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
          <UserRoute exact path="/authors/:authorId" component={Author} />
          <UserRoute exact path="/categories" component={Categories} />
          <UserRoute exact path="/categories/:categoryId" component={Category} />
        
        <AdminRoute exact path="/admin" component={Dashboard} />
        <AdminRoute exact path="/admin/books" component={AdminBooks} />
        <AdminRoute exact path="/admin/books/add" component={BookForm} />
        <AdminRoute exact path="/admin/books/edit/:bookId" component={BookForm} />
        <AdminRoute exact path="/admin/authors" component={AdminAuthors} />
        <AdminRoute exact path="/admin/authors/add" component={AuthorForm} />
        <AdminRoute exact path="/admin/authors/edit/:authorId" component={AuthorForm} />
        <AdminRoute exact path="/admin/categories" component={AdminCategories} />
        <AdminRoute exact path="/admin/categories/add" component={CategoryForm} />
        <AdminRoute exact path="/admin/categories/edit/:categoryId" component={CategoryForm} />
      </UserContext.Provider>

      </Router>
    </>
  );
}

export default App;
