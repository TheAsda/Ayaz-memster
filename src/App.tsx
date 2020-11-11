import 'rsuite/dist/styles/rsuite-default.css';

import { useGate } from 'effector-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './Header';
import { MemesGrid } from './Homepage/MemesGrid';
import { AppGate } from './models/memes';

// import Main from './Main/Main';
// import Constructor from './Constructor/Constructor';
// import Add from './Add/Add';
// import './css/App.css';
const App = () => {
  useGate(AppGate);

  return (
    <BrowserRouter>
      <Header />
      <div style={{ margin: '0 15%' }}>
        <Switch>
          <Route exact path="/" component={MemesGrid} />
          <Route path="/constructor" component={() => <div />} />
          <Route path="/add" component={() => <div />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
