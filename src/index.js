import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
    <div>
      <Animation pixelsFunc={() => randomPixels(600 * 600)}></Animation>
    </div>);
  }
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stepMs: props.stepMs || 0, imageData: [] };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.updateAnimation();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  updateAnimationState() {
    this.setState(state => ({ imageData: this.props.pixelsFunc(), stepMs: state.stepMs }));
    if (this.state.stepMs > 0) {
      this.sleep(this.state.stepMs).then(() => this.updateAnimation());
    }
    else {
      this.updateAnimation();
    }
  }

  updateAnimation() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  
  render() {
    return <Canvas imageData={this.state.imageData} />
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }
  
  saveContext(ctx) {
    this.ctx = ctx;
  }

  paint() {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);
    var newImageData = this.ctx.createImageData(width, height);
    for (var i = 0; i < this.props.imageData.length; i++) {
      newImageData.data[i] = this.props.imageData[i];
    }
    this.ctx.putImageData(newImageData, 0, 0);
    this.ctx.restore();
  }
  
  componentDidUpdate() {
    this.paint();
  }
  
  render() {
    return (
      <canvas
        width="600"
        height="600" 
        ref={node => node ? this.saveContext(node.getContext('2d')) : null}
      />);
  }
}

function randomPixels(length) {
  let data = [];
  for (var i = 0; i < length; i += 4) {
    data.push(randomInteger(0, 255)); // red
    data.push(randomInteger(0, 255)); // green
    data.push(randomInteger(0, 255)); // blue
    data.push(randomInteger(0, 255)); // alpha
  }

  return data;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.render(<App />, document.getElementById('root'));