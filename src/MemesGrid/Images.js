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

  componentDidMount() {
    const data = Store.getState();
    if (data.current.name !== '') document.getElementById(data.current.name).parentElement.classList.add('current');
    this.setState({ cur: data.current.name });
  }

  render() {
    const data = Store.getState();
    if (data.images !== {}) {
      let res = [];
      for (let img in data.images) {
        res.push(
          <div className="post" onClick={() => this.setCurrent(data.images[img], img)}>
            <img crossOrigin="anonymous" id={img} src={data.images[img]} alt={img} />
            <h3>{img}</h3>
          </div>
        );
      }
      return (
        <div className="posts">
          <p className="currentText">
            {this.state.cur !== '' ? 'Current image: ' + this.state.cur : "You didn't choose a photo"}
          </p>
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
    const items = document.getElementsByClassName('current');
    if (items[0] !== undefined) items[0].classList.remove('current');
    document.getElementById(name).parentElement.classList.add('current');
  }
}

export default Images;
