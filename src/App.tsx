import 'rsuite/dist/styles/rsuite-default.css';

import { useGate } from 'effector-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AddPage } from './AddPage/AddPage';
import { ConstructorPage } from './ConstructorPage/ConstructorPage';
import { Header } from './Header';
import { MemesGrid } from './Homepage/MemesGrid';
import { AppGate } from './models/memes';

const App = () => {
  useGate(AppGate);

  return (
    <BrowserRouter>
      <Header />
      <div style={{ margin: '0 15%' }}>
        <Switch>
          <Route exact path="/" component={MemesGrid} />
          <Route path="/constructor" component={ConstructorPage} />
          <Route path="/add" component={AddPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
