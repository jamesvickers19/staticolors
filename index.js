
let timestepMs = 1000;
const ctx = document.getElementById("canvas").getContext('2d');
animLoop(() => paintCanvasWithRandomPixels(ctx));

function paintCanvasWithRandomPixels(ctx) {
  paintCanvasWithPixels(ctx, randomPixels(800 * 800));
}

// https://gist.github.com/louisremi/1114293#file_anim_loop_x.js
function animLoop(renderFunc) {
  function loop() {
    if (timestepMs > 0) {
      setTimeout(() => requestAnimationFrame(loop), timestepMs);
    }
    else {
      requestAnimationFrame(loop);
    }
    renderFunc();
  }
  loop();
}

function paintCanvasWithPixels(ctx, pixelData) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  var newImageData = ctx.createImageData(width, height);
  let i = 0;
  for (const {red = 0, green = 0, blue = 0, alpha = 255} of pixelData) {
    newImageData.data[i] = red;
    newImageData.data[i + 1] = green;
    newImageData.data[i + 2] = blue;
    newImageData.data[i + 3] = alpha;
    i += 4; 
  }
  ctx.putImageData(newImageData, 0, 0);
}

function randomPixels(length) {
  let data = [];
  for (var i = 0; i < length; i++) {
    data.push({
      red: randomInteger(0, 255),
      //green: randomInteger(0, 255),
      //blue: randomInteger(0, 255),
      //alpha: randomInteger(0, 255)
    });
  }

  return data;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*

class App extends React.Component {
  render() {
    const dim = 500;
    return (
    <div>
      <Animation
        width={dim}
        height={dim}
        getImageData={() => randomPixels(dim * dim)}>
      </Animation>
    </div>);
  }
}

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stepMs: props.stepMs || 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  
  componentDidMount() {
    this.updateAnimation();
  }


  
  updateAnimationState() {
    this.setState(state => ({ imageData: this.props.getImageData(), stepMs: state.stepMs }));
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
    return (
      <Canvas
        width={this.props.width}
        height={this.props.height}
        imageData={this.state.imageData}
        />);
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
    this.ctx.clearRect(0, 0, width, height);
    var newImageData = this.ctx.createImageData(width, height);
    let i = 0;
    for (const {red = 0, green = 0, blue = 0, alpha = 255} of this.props.imageData) {
      newImageData.data[i] = red;
      newImageData.data[i + 1] = green;
      newImageData.data[i + 2] = blue;
      newImageData.data[i + 3] = alpha;
      i += 4; 
    }
    this.ctx.putImageData(newImageData, 0, 0);
  }
  
  componentDidUpdate() {
    this.paint();
  }
  
  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height} 
        ref={node => node ? this.saveContext(node.getContext('2d')) : null}
      />);
  }
}



ReactDOM.render(<App />, document.getElementById('root'));

*/