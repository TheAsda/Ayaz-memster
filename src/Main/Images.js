import React from 'react';
import './Images.css';
import { Store } from '../redux/configureStore';
import { setcur } from '../redux/actions';

class Images extends React.Component {
  constructor() {
    super();
    this.setCurrent = this.setCurrent.bind(this);
    this.state = { cur: '' };
  }

  componentWillMount() {
    const data = Store.getState();
    this.setState({ cur: data.current.name });
  }

  render() {
    const data = Store.getState();
    if (data.images !== {}) {
      let res = [];
      for (let img in data.images) {
        res.push(
          <div className="post">
            <img crossOrigin="anonymous" src={data.images[img]} onClick={() => this.setCurrent(data.images[img], img)} style={{ pointerEvents: 'all' }} />
            <h3>{img}</h3>
          </div>
        );
      }
      return (
        <div className="posts">
          <p class="current">{this.state.cur !== '' ? 'Current image: ' + this.state.cur : ''}</p>
          {res}
        </div>
      );
    } else
      return (
        <div className="error">
          <h2>Error</h2>
          <p>There was an error during loading...</p>
        </div>
      );
  }
  setCurrent(img, name) {
    Store.dispatch(setcur(name, img));
    this.setState({ cur: name });
  }
}

export default Images;
