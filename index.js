
let redMax = 255, greenMax = 255, blueMax = 255, alphaMax = 255;

setupSliderInputs([
  ["red", x => redMax = x],
  ["green", x => greenMax = x],
  ["blue", x => blueMax = x],
  ["alpha", x => alphaMax = x]
]);

function setupSliderInputs(idToValueCallback) {
  for (let [id, callback] of idToValueCallback) {
    document.getElementById(id).oninput = function() {
      callback(this.value);
    }
  }
}

let timestepMs = 0;
const canvas = document.getElementById("canvas"); 
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
    data.push({
      red: randomInteger(0, redMax),
      green: randomInteger(0, greenMax),
      blue: randomInteger(0, blueMax),
      alpha: randomInteger(0, alphaMax)
    });
  }

  return data;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}