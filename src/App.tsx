import { useGate } from 'effector-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { MemesGrid } from './MemesGrid';
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
      <MemesGrid />
      {/* <Switch ref={this.main}>
                <Route exact path="/" component={Main} />
                <Route path="/constructor" component={Constructor} />
                <Route path="/add" component={Add} />
              </Switch> */}
    </BrowserRouter>
  );
};

export default App;
