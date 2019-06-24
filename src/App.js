import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main/Main';
import Constructor from './Constructor/Constructor';
import Add from './Add/Add';
import './css/App.css';
import fb from './Firebase/firebase';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, Store } from './redux/configureStore';
import { setall } from './redux/actions';

class App extends React.Component {
  constructor() {
    super();
    this.main = React.createRef();
  }
  componentWillMount() {
    const child = this.main;
    fb.getImages().then(res => {
      Store.dispatch(setall(res));
      child.current.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        <Provider store={Store}>
          <ConnectedRouter history={history}>
            <Header />
            <Switch ref={this.main}>
              <Route exact path="/" component={Main} />
              <Route path="/constructor" component={Constructor} />
              <Route path="/add" component={Add} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
