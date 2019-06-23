import React from 'react';
import './Images.css';
import Cookie from 'universal-cookie';

const cookies = new Cookie();

export default class Images extends React.Component {
  constructor() {
    super();
    this.setCookie = this.setCookie.bind(this);
  }
  render() {
    if (this.props.data) {
      let res = [];
      for (let img in this.props.data) {
        res.push(
          <div className="post">
            <img crossOrigin="anonymous" src={this.props.data[img]} onClick={() => this.setCookie(this.props.data[img], img)} style={{ pointerEvents: 'all' }} />
            <h3>{img}</h3>
          </div>
        );
      }
      return <div className="posts">{res}</div>;
    }
    return;
  }
  setCookie(img, name) {
    cookies.set('current', img);
    cookies.set('title', name);
  }
}
