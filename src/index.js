
function colorSlider(id, valuesCallback) {
  var sliderDiv = document.getElementById(id);
  noUiSlider.create(sliderDiv, {
      range: {
          'min': 0,
          'max': 255
      },
      start: [0, 255],
      tooltips: true,
      connect: true,
      step: 1,
      format: wNumb({ decimals: 0 }),
  });
  sliderDiv.style.margin = '0px 100px 0px 100px';
  sliderDiv.noUiSlider.on('update', (values, _) => valuesCallback(values[0], values[1]));
}

function setupSliderInput(id, valueCallback) {
    document.getElementById(id).oninput = function() {
      valueCallback(this.value);
    }
}
  
let timestepMs = 0;
setupSliderInput("timestepMs", x => timestepMs = x); // TODO use nouislider, just to show input value?

let redMin = 0, redMax = 255, greenMin = 0, greenMax = 255, blueMin = 0, blueMax = 255, alphaMin = 0, alphaMax = 255;
colorSlider("redSlider", function(min, max) { redMin = min; redMax = max; });
colorSlider("greenSlider", function(min, max) { greenMin = min; greenMax = max; });
colorSlider("blueSlider", function(min, max) { blueMin = min; blueMax = max; });
colorSlider("alphaSlider", function(min, max) { alphaMin = min; alphaMax = max; });

const canvas = this.document.getElementById("canvas"); 
const ctx = canvas.getContext('2d');
animLoop(() => paintCanvasWithRandomPixels(ctx));

function paintCanvasWithRandomPixels(ctx) {
  paintCanvasWithPixels(ctx, randomPixels(canvas.width * canvas.height));
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
    data.push({ // TODO this seems really slow; much faster not using min values, and looks different
      red: randomInteger(redMin, redMax),
      green: randomInteger(greenMin, greenMax),
      blue: randomInteger(blueMin, blueMax),
      alpha: randomInteger(alphaMin, alphaMax)
    });
  }

  return data;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}