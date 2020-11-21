import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
    <div>
      <Animation></Animation>
    </div>);
  }
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stepMs: props.stepMs || 0 };
    console.log("stepMs: " + this.state.stepMs);
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.updateAnimation();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  updateAnimationState() {
    console.log("stepMs: " + this.state.stepMs);
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
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
    return <Canvas angle={this.state.angle} />
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

  paintRandom(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      data[i] = randomInteger(0, 255);       // red
      data[i + 1] = randomInteger(0, 255);  // green
      data[i + 2] = randomInteger(0, 255); // blue
      data[i + 3] = randomInteger(0, 255); // alpha
    }
    ctx.putImageData(imageData, 0, 0);
    ctx.restore();
  }
  
  componentDidUpdate() {
    this.paintRandom(this.ctx);
  }
  
  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() { return false; }
  
  render() {
    return (
      <canvas width="600" height="600" 
        ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
    )
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.render(<App />, document.getElementById('root'));