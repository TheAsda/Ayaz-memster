import 'rsuite/dist/styles/rsuite-default.css';

import { useGate } from 'effector-react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loader } from 'rsuite';

import { Header } from './Header';
import { MemesGrid } from './Homepage/MemesGrid';
import { AppGate } from './models/memes';

const ConstructorPage = lazy(() => import('./ConstructorPage/ConstructorPage'));
const AddPage = lazy(() => import('./AddPage/AddPage'));

const App = () => {
  useGate(AppGate);

  return (
    <BrowserRouter>
      <Header />
      <div style={{ margin: '0 10%' }}>
        <Suspense fallback={() => <Loader />}>
          <Switch>
            <Route exact path="/" component={MemesGrid} />
            <Route path="/constructor" component={ConstructorPage} />
            <Route path="/add" component={AddPage} />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
