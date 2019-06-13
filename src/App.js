import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main/Main';
import Constructor from './Constructor/Constructor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Main} />
      <Route path="/constructor" component={Constructor} />
    </BrowserRouter>
  );
}

export default App;
