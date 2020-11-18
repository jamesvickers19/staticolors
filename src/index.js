import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div>
      <Animation></Animation>
    </div>;
  }
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  
  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
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
  
  componentDidUpdate() {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i++) {
      data[i] = Math.trunc(Math.random() * 255);
    }
    this.ctx.putImageData(imageData, 0, 0);
    this.ctx.restore();
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

ReactDOM.render(<App />, document.getElementById('root'));