import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route, Link } from 'react-router-dom';

import AddStorage from './components/addStorage';
import Storage from './components/storage';
import StorageList from './components/storageList';

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/storage" className="navbar-brand">
          Avybe
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/storage"} className='nav-link'>
              Entries
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/storage"]} component={StorageList} />
          <Route exact path="/add" component={AddStorage} />
          <Route path="/storage/:id" component={Storage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;