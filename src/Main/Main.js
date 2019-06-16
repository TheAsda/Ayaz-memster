import React from 'react';
import Images from './Images';
import Firebase from '../Firebase/firebase';
import '../css/Error.css';

const fb = new Firebase();

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = { images: {} };
  }

  componentWillMount() {
    fb.getImages().then(res => {
      this.setState({ images: res });
    });
  }

  render() {
    if (this.state.images != {})
      return (
        <div>
          <Images data={this.state.images} />
        </div>
      );
    else
      return (
        <div className="error">
          <h2>Error</h2>
          <p>There was an error during the loading...</p>
        </div>
      );
  }
}
