import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main/Main';
import Constructor from './Constructor/Constructor';
import Add from './Add/Add';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Main} />
      <Route path="/constructor" component={Constructor} />
      <Route path="/add" component={Add}/>
    </BrowserRouter>
  );
}

export default App;
