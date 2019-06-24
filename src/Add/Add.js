import React from 'react';
import '../css/Add.css';
import { fb } from '../Firebase/firebase';

class Add extends React.Component {
  constructor() {
    super();
    this.name = React.createRef();
    this.link = React.createRef();
    this.send = this.send.bind(this);
    this.state = { result: <div /> };
  }
  render() {
    return (
      <div>
        <div className="add">
          <h4>Title</h4>
          <input type="text" ref={this.name} />
          <h4>Imgur link</h4>
          <input type="text" ref={this.link} />
          <br />
          <button onClick={this.send}>Send</button>
        </div>
        {this.state.result}
      </div>
    );
  }

  send() {
    const name = this.name.current.value;
    const link = this.link.current.value;
    if (fb.sendImages(name, link)) {
      this.setState({ result: <p className="result">Successful!</p> });
    } else {
      this.setState({ result: <p className="result">Wrong Data :(</p> });
    }
  }
}

export default Add;
