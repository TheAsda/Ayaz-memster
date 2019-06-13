import React from 'react';
import './Images.css';

export default class Images extends React.Component {
  render() {
    if (this.props.data) {
      let res = [];
      for (let img in this.props.data) {
        res.push(
          <div className="post">
            <img src={this.props.data[img]} />
            <p>{img}</p>
          </div>
        );
      }
      return <div className="posts">{res}</div>;
    }
    return;
  }
}
