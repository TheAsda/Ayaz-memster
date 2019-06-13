import React from 'react';
import Images from './Images';
import Firebase from '../Firebase/firebase';

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
    return (
      <div>
        <Images data={this.state.images} />
      </div>
    );
  }
}
