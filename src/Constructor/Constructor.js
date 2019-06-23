import React from 'react';
import Cookies from 'universal-cookie';
import { Stage, Layer, Image, Text } from 'react-konva';
import '../css/Error.css';
import '../css/Constructor.css';

const cookies = new Cookies();

class URLImage extends React.Component {
  state = {
    image: null,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  };

  componentDidMount() {
    this.loadImage();
  }

  loadImage() {
    const image = new window.Image();
    image.src = this.props.src.replace('jpg', 'png');
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      var scale = Math.min(500 / image.width, 500 / image.height);
      this.setState({
        image: image,
        x: 250 - (image.width / 2) * scale,
        y: 250 - (image.height / 2) * scale,
        width: image.width * scale,
        height: image.height * scale,
      });
      this.props.data.setState({
        topPos: {
          xLen: this.state.width,
          x: this.state.x,
          y: this.state.y,
        },
        botPos: {
          xLen: this.state.width,
          x: this.state.x,
          y: this.state.height,
        },
      });
    };
  }

  render() {
    return (
      <Image
        x={this.state.x}
        y={this.state.y}
        height={this.state.height}
        width={this.state.width}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class Constructor extends React.Component {
  constructor() {
    super();

    this.top = React.createRef();
    this.bottom = React.createRef();
    this.setBottom = this.setBottom.bind(this);
    this.setTop = this.setTop.bind(this);
  }

  state = {
    image: null,
    topText: '',
    bottomText: '',
    topPos: {
      x: 0,
      y: 0,
      xLen: 0,
    },
    botPos: {
      x: 0,
      y: 0,
      xLen: 0,
    },
  };

  render() {
    const currentPic = cookies.get('current');
    if (currentPic == undefined)
      return (
        <div className="error">
          <h2>Error</h2>
          <p>You have to choose a picture...</p>
        </div>
      );
    else
      return (
        <div class="constructor">
          <input onKeyUp={this.setTop} ref={this.top}>
          </input>
          <input onKeyUp={this.setBottom} ref={this.bottom}>
          </input>
          <Stage width={500} height={500}>
            <Layer>
              <URLImage src={currentPic} data={this} />
              <Text fontFamily={'Impact'} fill={'white'} stroke={'black'} fontSize={35} text={this.state.topText} wrap="word" align="center" x={this.state.topPos.x} y={this.state.topPos.y + 10} width={this.state.topPos.xLen} />
              <Text fontFamily={'Impact'} fill={'white'} stroke={'black'} fontSize={35} text={this.state.bottomText} wrap="word" align="center" verticalAlign="bottom" x={this.state.botPos.x} y={this.state.botPos.y - 35} width={this.state.botPos.xLen} />
            </Layer>
          </Stage>
          <button onClick={download}>Download</button>
        </div>
      );
  }

  setTop() {
    this.setState({ topText: this.top.current.value });
  }

  setBottom() {
    this.setState({ bottomText: this.bottom.current.value });
  }
}

function download() {
  var canvas = document.getElementsByTagName('canvas')[0];
  var url = canvas.toDataURL('image/jpg');
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = url;
  link.click();
}

export default Constructor;
