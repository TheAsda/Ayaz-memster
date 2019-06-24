import React from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import '../css/Error.css';
import '../css/Constructor.css';
import { Store } from '../redux/configureStore';

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
    image.crossOrigin = 'Anonymous';
    image.src = this.props.src;
    console.log(image);
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
    this.bottomText = React.createRef();
    this.topText = React.createRef();
    this.setBottom = this.setBottom.bind(this);
    this.setTop = this.setTop.bind(this);
  }

  state = {
    image: null,
    lines: 1,
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
    const data = Store.getState();
    const currentPic = data.current.img;
    if (currentPic == '')
      return (
        <div className="error">
          <h2>Error</h2>
          <p>You have to choose a picture...</p>
        </div>
      );
    else
      return (
        <div className="constructor">
          <input onChange={this.setTop} ref={this.top} className="memeText" />
          <Stage width={500} height={500}>
            <Layer style={{}}>
              <URLImage src={currentPic} data={this} />
              <Text
                ref={node => {
                  this.topText = node;
                }}
                fontFamily={'Impact'}
                fill={'white'}
                stroke={'black'}
                fontSize={35}
                text={this.state.topText}
                wrap="word"
                align="center"
                x={this.state.topPos.x}
                y={this.state.topPos.y + 2}
                width={this.state.topPos.xLen}
              />
              <Text
                ref={node => {
                  this.bottomText = node;
                }}
                fontFamily={'Impact'}
                fill={'white'}
                stroke={'black'}
                fontSize={35}
                text={this.state.bottomText}
                wrap="word"
                align="center"
                x={this.state.botPos.x}
                y={this.state.botPos.y + this.state.topPos.y - 37}
                width={this.state.botPos.xLen}
              />
            </Layer>
          </Stage>
          <input onChange={this.setBottom} ref={this.bottom} className="memeText" />
          <button onClick={download}>Download</button>
        </div>
      );
  }

  setTop() {
    if (this.top.current.value.length > 100) return;
    this.setState({ topText: this.top.current.value });
  }

  setBottom() {
    if (this.bottom.current.value.length > 100) return;
    if (this.bottomText.textArr.length > this.state.lines) {
      this.setState({
        botPos: {
          x: this.state.botPos.x,
          y: this.state.botPos.y - 35,
          xLen: this.state.botPos.xLen,
        },
        lines: this.state.lines + 1,
        bottomText: this.bottom.current.value,
      });
    } else if (this.bottomText.textArr.length < this.state.lines) {
      this.setState({
        botPos: {
          x: this.state.botPos.x,
          y: this.state.botPos.y + 35 * (this.state.lines - this.bottomText.textArr.length),
          xLen: this.state.botPos.xLen,
        },
        lines: this.state.lines - (this.state.lines - this.bottomText.textArr.length),
        bottomText: this.bottom.current.value,
      });
    } else this.setState({ bottomText: this.bottom.current.value });
  }
}

function download() {
  var canvas = document.getElementsByTagName('canvas')[0];
  var url = canvas.toDataURL('image/jpg');
  var link = document.createElement('a');
  const data = Store.getState();
  const currentPic = data.current.name;
  link.download = currentPic + '.png';
  link.href = url;
  link.click();
}

export default Constructor;
